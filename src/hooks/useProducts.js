import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await productsAPI.getAllProducts();
      setProducts(data.products);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  async function searchProducts(query) {
    setLoading(true);
    try {
      const data = await productsAPI.searchProducts(query);
      setProducts(data.products);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, loading, error, searchProducts };
}
