import axios from "axios";
import config from "../config";

const endpoint = axios.create({
  baseURL: config.serverDomain,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProfileUser = async (userId) => {
  try {
    const response = await endpoint.get("/users/" + userId);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
