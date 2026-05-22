import { Product } from '~/models/products.model';

const getNewProducts = (products: Product[]) => products
  .filter(({ label }) => label.toLowerCase() === 'new')
  .slice(0, 4);

export default defineEventHandler(async (event) => {
  const products: Product[] = await $fetch('https://willberries-c4ae1-default-rtdb.firebaseio.com/db.json');
  return getNewProducts(products);
});
