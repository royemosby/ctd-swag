import { Link } from 'react-router';

function Account({ user, handleLogOut }) {
  return (
    <div className="account">
      <h2>Your Account</h2>
      <div className="accountDetails">
        <p>First Name: {user.firstName}</p>
        <p htmlFor="lastName">Last Name: {user.lastName}</p>
        <p htmlFor="email">Email: {user.email}</p>
      </div>
      <div className="buttonGroup">
        <Link className="linkButton" to={'/'}>
          Go back
        </Link>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Account;
