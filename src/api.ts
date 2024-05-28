import { ProductItemType } from './types/ProductItemType';
import { Product } from './types/Product';

export const API_URL = 'https://phone-catalog-api-s7t8.onrender.com';
// export const API_URL = 'https://test-api-server-hetv.onrender.com';


export function getProducts(): Promise<Product[]> {
  return fetch(API_URL + '/products').then(response => response.json());
}

export function getOneProduct(id: string): Promise<ProductItemType> {
  return fetch(API_URL + `/products/${id}`).then(response => response.json());
}

export function getRecommendedProducts(id: string): Promise<Product[]> {
  return fetch(API_URL + `/products/${id}/recommended`).then(response => response.json());
}

export async function getProductsByCategory(
  category: string,
  sortBy = 'year',
  perPage: string,
  page = 1,
): Promise<{ products: Product[]; totalCount: number; totalPages: number }> {
  try {
    const response = await fetch(
      `${API_URL}/products/category/${category}?sortBy=${sortBy}&perPage=${perPage}&page=${page}`,
    );
    const data = await response.json();
    return {
      products: data.products,
      totalCount: data.totalCount,
      totalPages: data.totalPages,
    };
  } catch (error) {
    throw new Error('Failed to fetch products by category');
  }
}

export function getNewestProducts(): Promise<Product[]> {
  return fetch(API_URL + '/products/newest').then(response => response.json());
}

export function getHotPricesProducts(): Promise<Product[]> {
  return fetch(API_URL + '/products/hot-prices').then(response =>
    response.json(),
  );
}
