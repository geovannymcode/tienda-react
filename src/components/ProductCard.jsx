function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
      <img src={product.thumbnail} alt={product.title} style={{ width: '100%' }} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <strong>💲 {product.price}</strong>
    </div>
  );
}

export default ProductCard;