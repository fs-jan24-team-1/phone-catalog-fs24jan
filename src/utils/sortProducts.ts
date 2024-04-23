import { SortBy } from "../components/Filter/Filter";
import { Product } from "../types/Product";

export const sortProducts = (products: Product[], sortBy: SortBy) => {
  const sortedProductsCopy = [...products];
  if (sortBy === SortBy.price) {
    sortedProductsCopy.sort((a, b) => a.price - b.price);
  } else if (sortBy === SortBy.title) {
    sortedProductsCopy.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === SortBy.age) {
    sortedProductsCopy.sort((a, b) => b.year - a.year);
  }

  return sortedProductsCopy;
}
