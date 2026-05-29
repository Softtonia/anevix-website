"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormElement from '@/utils/FormElement/FormElement';
import Button from '@/utils/Button/Button';
import './Forgot.css';

export default function ResetPassword() {
  const router = useRouter();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API to reset password
    router.push('/signin');
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-form-section">
          <h1 className="Poppins-bold Poppins-bold">New Password</h1>
          <p className="forgot-subtitle">Please enter your secure password and keep it well.</p>

          <form onSubmit={handleSubmit} className="auth-form reset-password-form">
            <FormElement
              name="password"
              type="password"
              placeholder="New password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <FormElement
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <div style={{marginTop: 8}}>
              <Button type="submit" variant="primary">Reset Password</Button>
            </div>
          </form>
        </div>

        <div className="forgot-hero">
          <img src="/assets/images/forgot.png" alt="reset" style={{maxWidth: '90%', height: 'auto'}} />
        </div>
      </div>
    </div>
  );
}
