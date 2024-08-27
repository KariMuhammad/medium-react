import axios from "axios";
import config from "../config";
import { lookInSession } from "../common/session.jsx";

export const endpoint = axios.create({
  baseURL: config.serverDomain,
  headers: {
    Accept: "application/json",
  },
});

export const postAuthFormData = (apiRoute, formData) => {
  return endpoint.post(`/auth${apiRoute}`, formData);
};

export const changeUserPassword = (formData) => {
  return endpoint.post("/auth/change-password", formData, {
    headers: {
      Authorization: `Bearer ${lookInSession("user").token}`,
    },
  });
};
