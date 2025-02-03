import { useCallback, useEffect, useReducer, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import './App.css';
import './assets/css-reset.css';
import AuthDialog from './features/Auth/AuthDialog';
import Cart from './features/Cart/Cart';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Dialog from './shared/Dialog';
import Shop from './pages/Shop/Shop';
import Account from './pages/Account/Account';
import Checkout from './pages/Checkout/Checkout';
import ProductDetail from './pages/Product/ProductDetails';
import {
  initialState as cartInitialState,
  cartActions,
  cartReducer,
} from './reducers/App/cart.reducer';
import { sortByBaseName } from './utils/sortByBaseName';
import { sortByPrice } from './utils/sortByPrice';
import { filterByQuery } from './utils/filterByQuery';
import { convertInventoryToProducts } from './utils/convertInventoryToProducts';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
function App() {
  //keeping original for filtering logic
  const [inventory, setInventory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSortAscending, setIsSortAscending] = useState(true);
  const [sortBy, setSortBy] = useState('baseName');
  const [searchTerm, setSearchTerm] = useState('');

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    cartInitialState
  );

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${baseUrl}/products`);
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        const inventory = await resp.json();
        const sortedInventory = sortByBaseName({
          productItems: inventory,
          isSortAscending: true,
        });
        setInventory([...sortedInventory]);
        setFilteredProducts(convertInventoryToProducts(sortedInventory));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (sortBy === 'baseName') {
      setFilteredProducts((previous) =>
        sortByBaseName({ productItems: previous, isSortAscending })
      );
    } else {
      setFilteredProducts((previous) =>
        sortByPrice({ productItems: previous, isSortAscending })
      );
    }
  }, [isSortAscending, sortBy]);

  useEffect(() => {
    const filteredInventory = filterByQuery({
      productItems: inventory,
      searchTerm,
    });
    setFilteredProducts(convertInventoryToProducts(filteredInventory));
  }, [searchTerm, inventory]);

  useEffect(() => {
    //exits if not logged on
    if (!user.token) {
      return;
    }
    async function syncCartWithServer(workingCart, userToken) {
      const options = {
        method: 'PATCH',
        body: JSON.stringify({ cartItems: workingCart }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      };
      const resp = await fetch(`${baseUrl}/cart`, options);
      if (!resp.ok) {
        if (resp.status === 401) {
          throw new Error('Not authorized. Please log in.');
        }
      }
      const cartData = await resp.json();
      if (cartData.error) {
        throw new Error(cartData.error);
      }
    }
    syncCartWithServer(cartState.cart, user.token);
  }, [cartState.cart, user.token]);

  const handleUpdateCart = useCallback(
    (workingCart) => {
      dispatchCartAction({ type: cartActions.updateCart, cart: workingCart });
    },
    [dispatchCartAction]
  );

  async function handleAuthenticate(credentials) {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      setIsAuthenticating(true);
      const resp = await fetch(`${baseUrl}/auth/login`, options);
      if (!resp.ok) {
        if (resp.status === 401) {
          setAuthError('email or password incorrect');
        }
        throw new Error(resp.status);
      }
      const userData = await resp.json();
      setUser({ ...userData.user, token: userData.token });
      dispatchCartAction({
        type: cartActions.updateCart,
        cart: userData.cartItems,
      });
      setAuthError('');
      setIsAuthenticating(false);
      setIsAuthDialogOpen(false);
    } catch (error) {
      setIsAuthenticating(false);
      console.log(error.message);
    }
  }

  async function handleRegister(user) {
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      setIsAuthenticating(true);
      const resp = await fetch(`${baseUrl}/auth/register`, options);
      if (!resp.ok) {
        setAuthError('failed to create new user account');
        throw new Error(resp.status);
      }
      const userData = await resp.json();
      setUser({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        token: userData.token,
      });
      setAuthError('');
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  }

  async function handleAddItemToCart(id) {
    dispatchCartAction({ type: cartActions.addItem, id, inventory });
  }

  function handleCloseCart() {
    dispatchCartAction({ type: cartActions.close });
    setAuthError('');
  }

  function handleLogOut() {
    dispatchCartAction({ type: cartActions.reset });
    setUser({});
  }

  function handleOpenAuthDialog(option) {
    switch (option) {
      case 'register':
        setIsRegistering(true);
        break;
      default:
        setIsRegistering(false);
        break;
    }
    setIsAuthDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
    dispatchCartAction({ type: cartActions.dismissError });
  }

  return (
    <>
      {isDialogOpen && (
        <Dialog
          message={cartState.error}
          handleCloseDialog={handleCloseDialog}
        />
      )}
      <Header
        cart={cartState.cart}
        handleOpenCart={() => dispatchCartAction({ type: cartActions.open })}
        handleOpenAuthDialog={handleOpenAuthDialog}
        handleLogOut={handleLogOut}
        user={user}
      />
      {isAuthDialogOpen && (
        <AuthDialog
          handleCloseAuthDialog={() => setIsAuthDialogOpen(false)}
          handleAuthenticate={handleAuthenticate}
          handleRegister={handleRegister}
          authError={authError}
          isAuthenticating={isAuthenticating}
          isRegistering={isRegistering}
          resetAuthError={() => setAuthError('')}
        />
      )}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Shop
                filteredProducts={filteredProducts}
                handleAddItemToCart={handleAddItemToCart}
                setSortBy={setSortBy}
                setIsSortAscending={setIsSortAscending}
                sortBy={sortBy}
                isSortAscending={isSortAscending}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cartState.cart} />}
          />
          {user.id && (
            <Route
              path="/account"
              element={<Account user={user} handleLogOut={handleLogOut} />}
            />
          )}
          <Route
            path="/products/:id"
            element={
              <ProductDetail
                products={filteredProducts}
                handleAddItemToCart={handleAddItemToCart}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {cartState.isCartOpen && (
        <Cart
          cartError={cartState.error}
          isCartSyncing={cartState.isCartSyncing}
          cart={cartState.cart}
          handleUpdateCart={handleUpdateCart}
          handleCloseCart={handleCloseCart}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
