import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useProducts } from './useProducts';
import { productsAPI } from '../services/api';

vi.mock('../services/api');

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería cargar productos correctamente', async () => {
    const mockData = {
      products: [{ id: 1, title: 'Test Product' }],
      total: 1
    };

    vi.mocked(productsAPI.getAllProducts).mockResolvedValue(mockData);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockData.products);
    expect(result.current.error).toBe(null);
  });

  it('debería manejar errores', async () => {
    vi.mocked(productsAPI.getAllProducts).mockRejectedValue(new Error('Error de red'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Error de red');
    expect(result.current.products).toEqual([]);
  });

  it('debería buscar productos', async () => {
    const searchResult = {
      products: [{ id: 2, title: 'Buscado' }]
    };

    vi.mocked(productsAPI.getAllProducts).mockResolvedValue({ products: [] });
    vi.mocked(productsAPI.searchProducts).mockResolvedValue(searchResult);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(() => result.current.searchProducts('test'));

    expect(result.current.products).toEqual(searchResult.products);
  });
});
