import axiosClient from "./axiosClient";

export const getReviews = (productId, params) =>
  axiosClient.get(`/api/products/${productId}/reviews`, { params });

export const postReview = (productId, data) =>
  axiosClient.post(`/api/products/${productId}/reviews`, data);