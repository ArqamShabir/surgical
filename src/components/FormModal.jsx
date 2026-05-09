import React from 'react';

const FormModal = ({ open, type = 'success', title, message, onClose }) => {
  if (!open) return null;

  return (
    <div className="form-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className={`form-modal form-modal-${type}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="form-modal-close" onClick={onClose} aria-label="Cerrar mensaje">
          &times;
        </button>
        <div className="form-modal-icon" aria-hidden="true">
          {type === 'success' ? 'OK' : '!'}
        </div>
        <h3 id="form-modal-title">{title}</h3>
        <p>{message}</p>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default FormModal;
