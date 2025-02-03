import { Link, useParams } from 'react-router';
import placeholder from '../../assets/placeholder.png';
import styles from './ProductDetails.module.css';
const ProductDetail = ({ products, handleAddItemToCart }) => {
  const { id } = useParams();

  const [product] = products.filter((product) => {
    return product.id === id;
  });

  return (
    <div>
      {product ? (
        <>
          <h2>{product.baseName}</h2>
          <p>{product.baseDescription}</p>

          <>
            {product.variants.length > 1 && <h3>Variations...</h3>}
            <div className={styles.variants}>
              {product.variants.map((v) => {
                return (
                  <div className={styles.variant} key={v.id}>
                    <div className={styles.preview}>
                      <img
                        className={styles.baseImage}
                        src={placeholder}
                        alt="product preview placeholder"
                      />
                    </div>
                    <div className={styles.variantDetails}>
                      {v.variantName !== 'Default' && (
                        <h4>
                          {v.variantName} {product.baseName}
                        </h4>
                      )}
                      <p>{v.variantDescription}</p>
                      <p>${v.price.toFixed(2) || '0.00'}</p>
                      <div className="buttonGroup">
                        <button onClick={() => handleAddItemToCart(v.id)}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        </>
      ) : (
        <h2>Nothing Found</h2>
      )}
      <div className="buttonGroup">
        <Link className="linkButton" to="/">
          Back to Store
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
