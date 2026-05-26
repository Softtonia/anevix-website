"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormElement from "@/utils/FormElement";
import Button from "@/utils/Button";
import "./Forgot.css";

export default function Forgot() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API to send reset link / otp
    const params = new URLSearchParams({ from: "forgot", email });
    router.push(`/otp?${params.toString()}`);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-form-section">
          <h1 className="Poppins-bold">Forgot Password</h1>
          <p className="forgot-subtitle">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <FormElement
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="forgot-actions">
              <Button type="submit" variant="primary">
               Continue
              </Button>
              <a href="/signin" className="auth-forgot Poppins-regular text-decoration-none mt-2">
                Back to login
              </a>
            </div>
          </form>
        </div>

        <div className="forgot-hero">
          <img
            src="/assets/images/forgot.png"
            alt="forgot"
            style={{ maxWidth: "90%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
