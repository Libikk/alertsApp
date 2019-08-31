import axiosInstance from '../axiosInstance';

export class ProductService {
  static checkProdExistence = async (productUrlData) => axiosInstance.get(`/api/product/productExistence`, { params: { productUrlData } }).then(({ data }) => data);

  static addUserProduct = async (data) => axiosInstance.post(`/api/product/addUserProduct`, data).then(({ data }) => data);

  static getUserProducts = async () => axiosInstance.get(`/api/product/getUserProducts`).then(({ data }) => data);

  static deleteUserProduct = async (productId) => axiosInstance.delete(`/api/product/deleteUserProduct/${productId}`).then(({ data }) => data);
}
