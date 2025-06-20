import { useState } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';

function ProductList() {
  const [query, setQuery] = useState('');
  const { products, loading, error, searchProducts } = useProducts();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      searchProducts(query);
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '0.5rem', width: '60%' }}
        />
        <button type="submit" style={{ padding: '0.5rem' }}>🔍 Buscar</button>
      </form>

      {products.length === 0 && <p>No se encontraron productos</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;