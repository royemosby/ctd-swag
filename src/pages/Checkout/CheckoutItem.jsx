import placeholder from '../../assets/placeholder.png';
import styles from './CheckoutItem.module.css';

function CheckOutItem({ item }) {
  return (
    <li className={styles.cartItem}>
      <img src={placeholder} alt="" />
      <div>
        <h2>{item.baseName}</h2>
        {item.variantName !== 'Default' ? <p>{item.variantName}</p> : null}
      </div>
      <div className={styles.subtotal}>
        Count: {item.quantity}
        <p>Subtotal: ${(item.price * item.quantity).toFixed(2) || '0.00'}</p>
      </div>
    </li>
  );
}

export default CheckOutItem;
