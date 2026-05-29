"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  EmailOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  Apple,
  Google
} from '@mui/icons-material';
import FormElement from '@/utils/FormElement/FormElement';
import Button from '@/utils/Button/Button';
import './Login.css';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/otp');
  };

  return (
    <div className="auth-page auth-login-page">
      <div className="auth-card">
        <div className="auth-form-section">
          <h1 className='Poppins-bold'>Login to your account ...</h1>
          <p className="auth-subtitle">Please enter your email address and password to login to your account.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <FormElement
              name="email"
              type="email"
              placeholder="Enter Your Email Address"
              value={form.email}
              onChange={handleChange}
              icon={<EmailOutlined />}
            />

            <FormElement
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              icon={<VisibilityOutlined />}
              showPasswordToggle={true}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              VisibilityIcon={VisibilityOutlined}
              VisibilityOffIcon={VisibilityOffOutlined}
            />

            <div className="auth-actions-row">
              <Link href="/forgot-password" className="auth-forgot Poppins-regular">Forgot Password?</Link>
            </div>

            <Button type="submit" variant="primary">LOGIN</Button>

            <div className="auth-divider">
              <span>Or continue with</span>
            </div>

            <div className="auth-social-row">
              <button type="button" className="social-button social-apple Poppins-regular">
                <Apple className="social-icon" /> Continue with Apple
              </button>
              <button type="button" className="social-button social-google Poppins-regular">
                <Google className="social-icon" /> Continue with Google
              </button>
            </div>

            <p className="auth-already Poppins-regular">
              Don’t have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>

        <div className="auth-hero auth-hero-login">
          <img
            src="/assets/images/login.png"
            alt="login illustration"
            fill
            className="auth-login-image"
          />
        </div>
      </div>
    </div>
  );
}
