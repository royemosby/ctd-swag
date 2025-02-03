import { useEffect, useState } from 'react';
import ctdLogo from '../assets/icons/mono-blue-logo.svg';
import shoppingCart from '../assets/icons/shoppingCart.svg';
import { Link } from 'react-router';

function Header({ cart, handleOpenCart, handleOpenAuthDialog, user }) {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    if (cart.length > 0) {
      setCartCount(
        cart.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0)
      );
    } else {
      setCartCount(0);
    }
  }, [cart, user]);
  return (
    <header>
      <div>
        <Link className="siteBranding" to="/">
          <img src={ctdLogo} alt="Code The Dream Logo" />
          <h1>CTD Swag</h1>
        </Link>
      </div>
      <div className="userActions">
        {user.id ? (
          <>
            <Link to="/account" className="linkButton">
              <span>Hi, {user.firstName}</span>
            </Link>
          </>
        ) : (
          <>
            <button
              className="authButton"
              type="button"
              onClick={() => handleOpenAuthDialog('login')}
            >
              Log in
            </button>
            <span> or </span>
            <button
              className="authButton"
              type="button"
              onClick={() => handleOpenAuthDialog('register')}
            >
              Register
            </button>
          </>
        )}
      </div>
      <div className="shoppingCart">
        <button type="button" onClick={handleOpenCart}>
          <img src={shoppingCart} alt="" />
          <p className="cartCount">{cartCount}</p>
        </button>
      </div>
    </header>
  );
}

export default Header;
