import axios from "axios";
import config from "../config";
import { lookInSession } from "../common/session";

const endpoint = axios.create({
  baseURL: config.serverDomain,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createBlog = async (blog) => {
  try {
    const response = await endpoint.post("/blogs", blog, {
      headers: {
        Authorization: `Bearer ${lookInSession("user").token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogs = async ({ page = 1 }) => {
  console.log("Fetching blogs");

  try {
    const response = await endpoint.get("/blogs/latest?page=" + page);
    console.log(response.data);
    return response.data.blogs;
  } catch ({ response }) {
    console.log(response);
  }
};

export const getTrendingBlogs = async () => {
  try {
    const response = await endpoint.get("/blogs/trending");
    console.log(response.data.blogs);
    return response.data;
  } catch ({ resposne }) {
    console.log(resposne);
  }
};

export const getBlogsByTag = async ({ page = 1, tag }) => {
  console.log("Fetching blogs by Tags");
  try {
    const response = await endpoint.get(`/blogs?tags=${tag}&page=${page}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
