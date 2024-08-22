import axios from "axios";
import config from "../config";
import { lookInSession } from "../common/session";

const endpoint = axios.create({
  baseURL: config.serverDomain,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createComment = async ({ blog_id, data }) => {
  try {
    const response = await endpoint.post(`/comments/${blog_id}`, data, {
      headers: {
        Authorization: `Bearer ${lookInSession("user").token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch ({ response: { data } }) {
    throw data.errors;
  }
};

export const getComments = async (blog_id) => {
  try {
    const response = await endpoint.get(`/comments/${blog_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createReply = async ({ comment_id, data }) => {
  try {
    const response = await endpoint.post(
      `/comments/${comment_id}/replies`,
      data,
      {
        headers: {
          Authorization: `Bearer ${lookInSession("user").token}`,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch ({ response: { data } }) {
    throw data.errors;
  }
};
