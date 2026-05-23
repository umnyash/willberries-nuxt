import { Product } from '~/models/products.model';

export interface Query {
  field: keyof Product;
  name: string;
}

const getFilteredProducts2 = (products: Product[], query: Query) => (query.field && query.name)
  ? products.filter((product) => product[query.field] === query.name)
  : products


const getFilteredProducts = (products: Product[], query: Query) => {
  if (query.field && query.name) {
    return products.filter((product) => {
      const key = product[query.field];

      if (typeof key === 'string') {
        return key.toLowerCase() === query.name.toLowerCase();
      } else {
        return product[query.field] === query.name;
      }
    })
  } else {
    return products;
  }
}

export default defineEventHandler(async (event) => {
  const { field, name }: Query = getQuery(event);
  const products: Product[] = await $fetch('https://willberries-c4ae1-default-rtdb.firebaseio.com/db.json');
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return getFilteredProducts(products, { field, name });
});
