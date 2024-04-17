import { Product } from './types/Product';

const API_URL = '/api/products.json';

export function getProducts(): Promise<Product[]> {
  return fetch(API_URL)
    .then(response => response.json());
}

export function getProductById(id: number): Promise<Product> {
  return fetch(`${API_URL}/${id}`)
    .then(response => response.json());
}
