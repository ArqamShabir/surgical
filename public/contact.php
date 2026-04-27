<?php
ini_set('display_errors', '0');
ob_start();
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function send_json(array $payload, int $status = 200): void {
  http_response_code($status);
  if (ob_get_length()) {
    ob_clean();
  }
  echo json_encode($payload);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  send_json(['ok' => false, 'error' => 'Method not allowed'], 405);
}

$MAIL_CONFIG = [];
$privateConfig = __DIR__ . '/mail-config.php';
if (file_exists($privateConfig)) {
  $loadedConfig = require $privateConfig;
  if (is_array($loadedConfig)) {
    $MAIL_CONFIG = $loadedConfig;
  }
}

function config_value(string $key, string $fallback): string {
  global $MAIL_CONFIG;
  $envValue = getenv($key);
  if ($envValue !== false && $envValue !== '') {
    return $envValue;
  }
  return isset($MAIL_CONFIG[$key]) && $MAIL_CONFIG[$key] !== '' ? (string)$MAIL_CONFIG[$key] : $fallback;
}

$TO_EMAIL   = config_value('CONTACT_TO_EMAIL', 'arqamking128@gmail.com');
$FROM_EMAIL = config_value('CONTACT_FROM_EMAIL', 'arqamking128@gmail.com');
$FROM_NAME  = getenv('CONTACT_FROM_NAME') ?: 'CoinSurgical Website';

$SMTP = [
  'host'   => config_value('SMTP_HOST', 'smtp.gmail.com'),
  'user'   => config_value('SMTP_USER', 'arqamking128@gmail.com'),
  'pass'   => config_value('SMTP_PASS', 'srty puav krzj cziq'),
  'port'   => (int)config_value('SMTP_PORT', '587'),
  'secure' => config_value('SMTP_SECURE', 'tls'),
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
$formType = clean_text($data['formType'] ?? 'contact');
$items = isset($data['items']) && is_array($data['items']) ? $data['items'] : [];
$hp = trim((string)($data['hp'] ?? ''));

if ($hp !== '') {
  send_json(['ok' => true, 'message' => 'Thanks']);
}

if ($name === '' || $email === '' || ($formType !== 'quote' && $message === '')) {
  send_json(['ok' => false, 'error' => 'Please complete all required fields.'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  send_json(['ok' => false, 'error' => 'Please enter a valid email address.'], 400);
}

if (strlen($name) > 80 || strlen($email) > 120 || strlen($company) > 120 || strlen($subject) > 140 || strlen($message) > 2000) {
  send_json(['ok' => false, 'error' => 'Message is too long.'], 400);
}

$safeItems = [];
if ($formType === 'quote') {
  foreach ($items as $item) {
    if (!is_array($item)) {
      continue;
    }
    $safeItems[] = [
      'name' => clean_text($item['name'] ?? ''),
      'article' => clean_text($item['article'] ?? $item['id'] ?? ''),
      'variant' => clean_text($item['variant'] ?? 'Standard'),
      'quantity' => max(1, min(999, (int)($item['quantity'] ?? 1))),
    ];
  }

  if ($company === '' || count($safeItems) === 0) {
    send_json(['ok' => false, 'error' => 'Please add at least one product and complete all required fields.'], 400);
  }
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';

if ($formType === 'quote') {
  $itemLines = array_map(function ($item, $index) {
    $number = $index + 1;
    return "{$number}. {$item['name']}\r\n   Article: {$item['article']}\r\n   Variant: {$item['variant']}\r\n   Quantity: {$item['quantity']}";
  }, $safeItems, array_keys($safeItems));

  $bodyLines = [
    'New quote request from CoinSurgical inquiry list:',
    '',
    "Name: $name",
    "Email: $email",
    "Company / Organization: $company",
    '',
    'Selected instruments:',
    implode("\r\n\r\n", $itemLines),
    '',
    'Additional requirements:',
    $message !== '' ? $message : 'None provided',
    '',
    '---',
    "IP: $ip",
    "User Agent: $ua",
  ];
  $finalSubject = 'Quote request from ' . $name;
} else {
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
  $finalSubject = 'Contact: ' . $subject;
}

$body = implode("\r\n", array_filter($bodyLines, fn($line) => $line !== null));

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
  send_json(['ok' => true, 'message' => $formType === 'quote' ? 'Quote request sent' : 'Message sent']);
} else {
  error_log('[contact.php] Failed: ' . ($error ?: 'unknown error'));
  send_json(['ok' => false, 'error' => 'Message could not be sent. Please email us directly.'], 500);
}
