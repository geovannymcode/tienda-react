const BASE_URL = 'https://dummyjson.com';

export const productsAPI = {
  async getAllProducts(limit = 10, skip = 0) {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
      if (!response.ok) throw new Error('Error al obtener productos');
      return await response.json();
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  },

  async getProductById(id) {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error('Producto no encontrado');
      return await response.json();
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  },

  async searchProducts(query) {
    try {
      const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
      if (!response.ok) throw new Error('Error al buscar productos');
      return await response.json();
    } catch (error) {
      throw new Error(`Error en búsqueda: ${error.message}`);
    }
  }
};