import { useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ onSubmit, notice, onCreateAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    const result = onSubmit({ email: email.trim().toLowerCase(), password });
    if (result.startsWith("Welcome back")) {
      setMessage(result);
    } else {
      setError(result);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {notice && <p className="notice-message" role="status">{notice}</p>}
      <label htmlFor="login-email">Email address</label>
      <input
        id="login-email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <div className="label-row">
        <label htmlFor="login-password">Password</label>
      </div>
      <input
        id="login-password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error && <p className="error-message" role="alert">{error}</p>}
      {message && <p className="success-message" role="status">{message}</p>}
      <button className="submit-button" type="submit">Sign in <span aria-hidden="true">↗</span></button>
      <p className="switch-prompt">New to Northline? <button type="button" onClick={onCreateAccount}>Create an account</button></p>
    </form>
  );
}
