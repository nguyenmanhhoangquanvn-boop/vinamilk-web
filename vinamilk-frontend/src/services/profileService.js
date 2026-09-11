import axiosClient from "./axiosClient";

export const getProfile = () => axiosClient.get("/api/auth/me");
export const updateProfile = (data) => axiosClient.put("/api/auth/me", data);
export const changePassword = (data) => axiosClient.put("/api/auth/password", data);