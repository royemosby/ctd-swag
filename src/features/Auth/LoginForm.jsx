import { useState } from 'react';
import ctdLogo from '../../assets/icons/mono-blue-logo.svg';

function AuthForm({
  handleAuthenticate,
  handleCloseAuthDialog,
  authError,
  dismissAuthError,
}) {
  const [email, setEmail] = useState('dev@test.com');
  const [password, setPassword] = useState('password123');

  function handleSubmit(e) {
    e.preventDefault();
    handleAuthenticate({ email, password });
  }
  return (
    <form className="authForm">
      <div className="siteBranding">
        <img src={ctdLogo} alt="Code The Dream Logo" />
        <h2>Log in to CTD Swag</h2>
      </div>
      <div className="inputGroup">
        <label htmlFor="email">Email</label>
        <input
          autoComplete="off"
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="authSubmitButtons">
        <button
          disabled={!email || !password}
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button type="button" onClick={handleCloseAuthDialog}>
          Cancel
        </button>
      </div>
      {authError && (
        <div className="authErrorMessage" onClick={dismissAuthError}>
          <p>{authError}</p>
        </div>
      )}
    </form>
  );
}

export default AuthForm;
