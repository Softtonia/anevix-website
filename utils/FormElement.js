import React from 'react';
import './FormElement.css';

export default function FormElement({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  icon = null,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword = null,
  VisibilityIcon = null,
  VisibilityOffIcon = null
}) {
  return (
    <div className="form-element-wrapper">
      <div className="form-input-container">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={error ? 'form-input form-input-error' : 'form-input'}
        />
        {icon && <span className="form-icon">{icon}</span>}
        {showPasswordToggle && onTogglePassword && (
          <button
            type="button"
            className="password-toggle-btn"
            onClick={onTogglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </button>
        )}
      </div>
      {error && <span className="form-error-msg">{error}</span>}
    </div>
  );
}
