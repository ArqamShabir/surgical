<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$TO_EMAIL   = getenv('CONTACT_TO_EMAIL') ?: 'accel8295@gmail.com';
$FROM_EMAIL = getenv('CONTACT_FROM_EMAIL') ?: 'no-reply@coinsurgical.com';
$FROM_NAME  = getenv('CONTACT_FROM_NAME') ?: 'CoinSurgical Website';

$SMTP = [
  'host'   => getenv('SMTP_HOST') ?: 'smtp.hostinger.com',
  'user'   => getenv('SMTP_USER') ?: 'no-reply@coinsurgical.com',
  'pass'   => getenv('SMTP_PASS') ?: '',
  'port'   => (int)(getenv('SMTP_PORT') ?: 587),
  'secure' => getenv('SMTP_SECURE') ?: 'tls',
];

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  $data = $_POST;
}

function clean_text($value) {
  $value = is_string($value) ? $value : '';
  return trim(strip_tags($value));
}

$name = clean_text($data['name'] ?? '');
$email = trim((string)($data['email'] ?? ''));
$company = clean_text($data['company'] ?? '');
$subject = clean_text($data['subject'] ?? 'Website inquiry');
$message = trim((string)($data['message'] ?? ''));
$hp = trim((string)($data['hp'] ?? ''));

if ($hp !== '') {
  echo json_encode(['ok' => true, 'message' => 'Thanks']);
  exit;
}

if ($name === '' || $email === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Please complete all required fields.']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
  exit;
}

if (strlen($name) > 80 || strlen($email) > 120 || strlen($company) > 120 || strlen($subject) > 140 || strlen($message) > 2000) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Message is too long.']);
  exit;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
$bodyLines = [
  'New message from CoinSurgical contact form:',
  '',
  "Name: $name",
  "Email: $email",
  $company !== '' ? "Company / Hospital: $company" : null,
  "Subject: $subject",
  '',
  'Message:',
  $message,
  '',
  '---',
  "IP: $ip",
  "User Agent: $ua",
];
$body = implode("\r\n", array_filter($bodyLines, fn($line) => $line !== null));
$finalSubject = 'Contact: ' . $subject;

function try_send_with_phpmailer(array $SMTP, string $FROM_EMAIL, string $FROM_NAME, string $TO_EMAIL, string $replyEmail, string $replyName, string $subject, string $body, ?string &$err): bool {
  $err = null;
  $loaded = false;

  if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
    $loaded = class_exists('PHPMailer\\PHPMailer\\PHPMailer');
  }

  if (!$loaded) {
    $base = __DIR__ . '/phpmailer/src/';
    if (file_exists($base . 'PHPMailer.php')) {
      require_once $base . 'PHPMailer.php';
      require_once $base . 'SMTP.php';
      require_once $base . 'Exception.php';
      $loaded = class_exists('PHPMailer\\PHPMailer\\PHPMailer');
    }
  }

  if (!$loaded) {
    $err = 'PHPMailer not available';
    return false;
  }

  if (empty($SMTP['pass'])) {
    $err = 'SMTP password is not configured';
    return false;
  }

  try {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $SMTP['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $SMTP['user'];
    $mail->Password = $SMTP['pass'];
    $mail->Port = (int)$SMTP['port'];
    $mail->SMTPSecure = strtolower($SMTP['secure']) === 'ssl'
      ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
      : PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom($FROM_EMAIL, $FROM_NAME);
    $mail->addAddress($TO_EMAIL);
    $mail->addReplyTo($replyEmail, $replyName ?: $replyEmail);
    $mail->Subject = $subject;
    $mail->isHTML(false);
    $mail->Body = $body;
    return $mail->send();
  } catch (Throwable $e) {
    $err = 'SMTP error: ' . $e->getMessage();
    return false;
  }
}

function try_send_with_mail(string $FROM_EMAIL, string $FROM_NAME, string $TO_EMAIL, string $replyEmail, string $replyName, string $subject, string $body, ?string &$err): bool {
  $headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $FROM_NAME . ' <' . $FROM_EMAIL . '>',
    'Reply-To: ' . ($replyName ?: $replyEmail) . ' <' . $replyEmail . '>',
    'Return-Path: ' . $FROM_EMAIL,
    'X-Mailer: PHP/' . phpversion(),
  ];

  $ok = @mail($TO_EMAIL, $subject, $body, implode("\r\n", $headers), '-f' . $FROM_EMAIL);
  if (!$ok) {
    $err = 'mail() failed or is blocked by server';
  }
  return $ok;
}

$error = null;
$sent = try_send_with_phpmailer($SMTP, $FROM_EMAIL, $FROM_NAME, $TO_EMAIL, $email, $name, $finalSubject, $body, $error);

if (!$sent) {
  if ($error) {
    error_log('[contact.php] PHPMailer: ' . $error);
  }
  $sent = try_send_with_mail($FROM_EMAIL, $FROM_NAME, $TO_EMAIL, $email, $name, $finalSubject, $body, $error);
}

if ($sent) {
  echo json_encode(['ok' => true, 'message' => 'Message sent']);
} else {
  error_log('[contact.php] Failed: ' . ($error ?: 'unknown error'));
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Message could not be sent. Please email us directly.']);
}
