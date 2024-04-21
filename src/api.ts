import { ProductItemType } from './types/ProductItemType';
import { Product } from './types/Product';

const API_URL = './api/products.json';

export function getProducts(): Promise<Product[]> {
  return fetch(API_URL).then(response => response.json());
}

export function getPhones(): Promise<ProductItemType[]> {
  return fetch(`./api/phones.json`).then(response => response.json());
}

export function getTablets(): Promise<ProductItemType[]> {
  return fetch(`./api/tablets.json`).then(response => response.json());
}

export function getAccessories(): Promise<ProductItemType[]> {
  return fetch(`./api/accessories.json`).then(response => response.json());
}
