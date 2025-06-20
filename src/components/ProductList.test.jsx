import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';
import { vi } from 'vitest';

vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      products: [
        { id: 1, title: 'Producto 1', description: 'Desc', price: 100, thumbnail: '' },
        { id: 2, title: 'Producto 2', description: 'Desc 2', price: 200, thumbnail: '' },
      ]
    }),
  })
));

describe('ProductList', () => {
  it('debería renderizar productos después de cargarlos', async () => {
    render(<ProductList />);

    expect(screen.getByText(/Cargando productos/)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Producto 1')).toBeInTheDocument();
      expect(screen.getByText('Producto 2')).toBeInTheDocument();
    });
  });

  it('debería mostrar mensaje de error si fetch falla', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });
});