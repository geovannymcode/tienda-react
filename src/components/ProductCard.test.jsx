import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Producto de prueba',
    price: 150,
    description: 'Una breve descripción',
    thumbnail: 'https://dummyimage.com/300x300',
  };

  it('debería renderizar título, descripción, precio e imagen', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('Producto de prueba')).toBeInTheDocument();
    expect(screen.getByText('Una breve descripción')).toBeInTheDocument();
    expect(screen.getByText(/150/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', product.thumbnail);
  });
});
