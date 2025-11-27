import api from './axiosConfig.js';

// Get all products
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query) => {
  try {
    // For now, we'll get all products and filter on frontend
    // Later this can be moved to backend with proper search endpoint
    const response = await api.get('/products');
    const products = response.data;
    
    if (!query || query.trim() === '') {
      return products;
    }
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};