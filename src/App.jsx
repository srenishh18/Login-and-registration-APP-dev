import { useState } from "react";
import Login from "./Login.js";
import Registration from "./Registration.js";

export default function App() {
  const [mode, setMode] = useState("login");
  const [account, setAccount] = useState(null);
  const [notice, setNotice] = useState("");

  function changeMode(nextMode) {
    setMode(nextMode);
    setNotice("");
  }

  function registerUser(details) {
    console.info("Registration submitted:", {
      username: details.username,
      email: details.email,
    });
    setAccount(details);
    setMode("login");
    setNotice("Account created. You can now sign in.");
  }

  function loginUser(credentials) {
    setNotice("");
    console.info("Login submitted:", { email: credentials.email });
    if (!account || account.email !== credentials.email || account.password !== credentials.password) {
      return "We could not find an account with those details in this session.";
    }
    return `Welcome back, ${account.username}. You are signed in.`;
  }

  return (
    <main className="auth-layout">
      <aside className="visual-panel" aria-label="Northline workspace">
        <div className="visual-topline">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span className="brand-name">NORTHLINE</span>
        </div>
        <div className="visual-copy">
          <span className="visual-kicker">YOUR WORKSPACE</span>
          <h1>Make space<br />for what matters.</h1>
          <p>A calm place to pick up where you left off.</p>
        </div>
        <span className="visual-caption">A GOOD PLACE TO BEGIN</span>
      </aside>

      <section className="form-panel" aria-label="Account access">
        <div className="form-wrap">
          <div className="mobile-brand">
            <span className="brand-mark" aria-hidden="true">N</span>
            <span className="brand-name">NORTHLINE</span>
          </div>
          <p className="form-eyebrow">MEMBER ACCESS</p>
          <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p className="form-intro">
            {mode === "login" ? "Sign in to continue to your workspace." : "A few details and you’re all set."}
          </p>

          <div className="mode-switch" role="tablist" aria-label="Account action">
            <button
              className={mode === "login" ? "mode-tab active" : "mode-tab"}
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              onClick={() => changeMode("login")}
            >
              Sign in
            </button>
            <button
              className={mode === "register" ? "mode-tab active" : "mode-tab"}
              type="button"
              role="tab"
              aria-selected={mode === "register"}
              onClick={() => changeMode("register")}
            >
              Create account
            </button>
          </div>

          {mode === "login" ? (
            <Login onSubmit={loginUser} notice={notice} onCreateAccount={() => changeMode("register")} />
          ) : (
            <Registration onSubmit={registerUser} />
          )}

          <p className="form-footnote">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>
        <span className="page-index">01 <span /> 02</span>
      </section>
    </main>
  );
}
