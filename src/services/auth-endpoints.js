import axios from "axios";
import config from "../config";

export const endpoint = axios.create({
  baseURL: config.serverDomain,
  headers: {
    Accept: "application/json",
  },
});

export const postAuthFormData = (apiRoute, formData) => {
  return endpoint.post(`/auth${apiRoute}`, formData);
};
