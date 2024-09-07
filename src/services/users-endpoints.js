import axios from "axios";
import config from "../config";
import { lookInSession } from "../common/session";

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

export const updatedProfileImageUser = async (image) => {
  try {
    const response = await endpoint.patch(
      `/auth/profile-image/edit`,
      {
        url: image,
      },
      {
        headers: {
          Authorization: `Bearer ${lookInSession("user").token}`,
        },
      }
    );

    return response.data;
  } catch ({ response }) {
    console.log(response.data);
    throw response;
  }
};

export const updateProfileUser = async (formData) => {
  try {
    const response = await endpoint.patch(
      `/auth/profile/edit`,
      { ...formData },
      {
        headers: {
          Authorization: `Bearer ${lookInSession("user").token}`,
        },
      }
    );

    return response.data;
  } catch ({ response }) {
    console.log(response.data);
    throw response;
  }
};
