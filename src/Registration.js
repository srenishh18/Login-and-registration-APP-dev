import { useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Registration({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password) {
      setError("Complete all fields to create your account.");
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    onSubmit({ username: username.trim(), email: email.trim().toLowerCase(), password });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="register-name">Name</label>
      <input
        id="register-name"
        type="text"
        autoComplete="name"
        placeholder="Your name"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label htmlFor="register-email">Email address</label>
      <input
        id="register-email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="register-password">Password</label>
      <input
        id="register-password"
        type="password"
        autoComplete="new-password"
        placeholder="At least 8 characters"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error && <p className="error-message" role="alert">{error}</p>}
      <button className="submit-button" type="submit">Create account <span aria-hidden="true">↗</span></button>
    </form>
  );
}
