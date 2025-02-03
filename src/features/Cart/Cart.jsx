import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CartItem from './CartItem';

function Cart({
  cart,
  handleCloseCart,
  handleUpdateCart,
  cartError,
  isCartSyncing,
}) {
  const navigate = useNavigate();
  const [workingCart, setWorkingCart] = useState(cart);
  const [isFormDirty, setIsFormDirty] = useState(false);

  //resets `workingCart`
  useEffect(() => {
    if (isFormDirty || isCartSyncing) {
      return;
    }
    setWorkingCart(cart);
  }, [cart, isFormDirty, isCartSyncing]);

  function getCartPrice() {
    return workingCart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  }

  function handleUpdateField({ event, id }) {
    event.preventDefault();
    // prevent re-render if already dirty
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
    const targetProduct = cart.find((item) => item.productId === id);
    const targetIndex = cart.findIndex((item) => item.productId === id);
    if (!targetProduct) {
      console.error('cart error: item not found');
      return;
    }
    //reject negative values or if user deletes value
    if (event.target.value < 0 || event.target.value === '') {
      return;
    }
    // create new object instead of updating old
    const updatedProduct = {
      ...targetProduct,
      quantity: parseInt(event.target.value, 10),
    };
    //avoid re-ordering array when updating cart item
    setWorkingCart([
      ...workingCart.slice(0, targetIndex),
      updatedProduct,
      ...workingCart.slice(targetIndex + 1),
    ]);
  }

  function handleCancel(e) {
    e.preventDefault();
    setIsFormDirty(false);
    setWorkingCart([...cart]);
  }

  function handleCheckout(e) {
    e.preventDefault();
    handleCloseCart();
    navigate('/checkout');
  }

  function removeEmptyItems(cart) {
    return cart.filter((i) => i.quantity !== 0);
  }

  function handleConfirm(e) {
    e.preventDefault();
    handleUpdateCart([...removeEmptyItems(workingCart)]);
    setIsFormDirty(false);
  }

  return (
    <>
      <div className="cartScreen"></div>
      <div className="cartListWrapper">
        {workingCart.length === 0 ? (
          <p>cart is empty</p>
        ) : (
          <form>
            <ul className="cartList">
              {workingCart.map((item) => {
                return (
                  <CartItem
                    key={item.id || Date.now()}
                    item={item}
                    onHandleItemUpdate={handleUpdateField}
                  />
                );
              })}
            </ul>
            {isFormDirty && (
              <div>
                <button onClick={handleConfirm}>Confirm Update</button>
                <button onClick={handleCancel}>Cancel Update</button>
              </div>
            )}
          </form>
        )}
        <h2>Cart Total: ${getCartPrice()}</h2>
        <div className="cartFooter">
          <div className="buttonGroup">
            <button disabled={isFormDirty} onClick={handleCloseCart}>
              CloseCart
            </button>
            <button disabled={isFormDirty} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
          {cartError && <p>{cartError}</p>}
        </div>
      </div>
    </>
  );
}

export default Cart;
