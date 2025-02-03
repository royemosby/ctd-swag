import { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import placeholder from '../../assets/placeholder.png';
import ProductCardVariants from './ProductCardVariants';

function ProductCard({ product, handleAddItemToCart }) {
  const [areVariantsShown, setAreVariantsShown] = useState(false);
  return (
    <Card>
      <Preview>
        <img src={placeholder} alt="product preview placeholder" />
      </Preview>
      <Copy>
        <h2>{product.baseName}</h2>
        <Details>{product.baseDescription}</Details>
        <Details>${product.price.toFixed(2) || '0.00'}</Details>
      </Copy>
      <ButtonWrapper>
        {product.variants?.length > 1 ? (
          <>
            <Link to={`/products/${product.id}`} className="linkButton">
              {product.variants.length} Options Available
            </Link>
          </>
        ) : (
          <>
            <Link className="linkButton" to={`/products/${product.id}`}>
              Details
            </Link>
            <button onClick={() => handleAddItemToCart(product.variants[0].id)}>
              Quick Add
            </button>
          </>
        )}
      </ButtonWrapper>
      {areVariantsShown && (
        <ProductCardVariants
          handleAddItemToCart={handleAddItemToCart}
          variants={product.variants}
          closeVariants={() => setAreVariantsShown(false)}
        />
      )}
    </Card>
  );
}

const Card = styled.li`
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
  border-radius: var(--medium-radius);
  justify-content: space-between;
`;

const Preview = styled.div`
  border-radius: var(--medium-radius) var(--medium-radius) 0 0;
  overflow: hidden;
  border: 4px solid var(--dark-blue);
`;

const Copy = styled.div`
  padding: 0.25rem;
`;
const Details = styled.p`
  padding: 0.5rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  button,
  .linkButton {
    border: none;
    background-color: rgb(from var(--medium-blue) r g b / 0.5);
    width: 100%;
    &:hover {
      background-color: rgb(from var(--medium-blue) r g b / 0.25);
    }
    &:active {
      background-color: rgb(from var(--light-blue) r g b / 0.25);
    }
  }
  .linkButton {
    border-radius: 0;
    font-weight: normal;
    display: flex;
    align-items: center;
  }
`;

export default ProductCard;
