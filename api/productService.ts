import axios from 'axios';

export class ProductService {
  static checkProdExistence = async (productUrlData) => axios.get(`http://localhost:3000/api/product/productExistence`, {params: { productUrlData }}).then(response => response);
}
