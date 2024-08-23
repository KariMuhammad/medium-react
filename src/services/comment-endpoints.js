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
    return response.data.data;
  } catch ({ response: { data } }) {
    throw data.errors;
  }
};

export const getComments = async ({ blog_id, page = 1 }) => {
  try {
    const response = await endpoint.get(`/comments/${blog_id}?page=${page}`);
    return response.data.data;
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

    return response.data.data;
  } catch ({ response: { data } }) {
    throw data.errors;
  }
};

export const deleteComment = async ({ id }) => {
  try {
    const response = await endpoint.delete(`/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${lookInSession("user").token}`,
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// [TODO]
// export const toggleLikeCommentOrReply = async ({ id, action = "like" }) => {
//   try {
//     const response = await endpoint.post(
//       `/comments/${id}/${action}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${lookInSession("user").token}`,
//         },
//       }
//     );

//     return response.data.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
