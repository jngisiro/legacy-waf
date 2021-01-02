import { Product } from './Product';

export interface ProductResponse {
  data: {
    products: Product[];
  };
}
