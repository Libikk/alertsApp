import axios from 'axios';

export class ProductService {
  static checkProdExistence = async (productUrlData) => axios.get(`http://localhost:3000/api/product/productExistence`, { params: { productUrlData } }).then(({ data }) => data);

  static addUserProduct = async (data) => axios.post(`http://localhost:3000/api/product/addUserProduct`, data).then(({ data }) => data);

  static getUserProducts = async () => axios.get(`http://localhost:3000/api/product/getUserProducts`).then(({ data }) => data);

  static deleteUserProduct = async (productId) => axios.delete(`http://localhost:3000/api/product/deleteUserProduct/${productId}`).then(({ data }) => data);
}
