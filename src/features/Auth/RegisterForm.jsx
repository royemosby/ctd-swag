import { useState } from 'react';
import ctdLogo from '../../assets/icons/mono-blue-logo.svg';

function AuthForm({
  handleRegister,
  handleCloseAuthDialog,
  authError,
  dismissAuthError,
}) {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('dev@test.com');
  const [password, setPassword] = useState('password123');

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({ email, password, firstName, lastName });
  }
  return (
    <form className="authForm">
      <div className="siteBranding">
        <img src={ctdLogo} alt="Code The Dream Logo" />
        <h2>Log in to CTD Swag</h2>
      </div>
      <div className="inputGroup">
        <label htmlFor="firstName">FirstName</label>
        <input
          autoComplete="off"
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="lastName">Last Name</label>
        <input
          autoComplete="off"
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="email">Email</label>
        <input
          autoComplete="off"
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="authSubmitButtons">
        <button
          disabled={!email || !password || !firstName || !lastName}
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
