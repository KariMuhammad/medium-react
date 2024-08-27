import axios from "axios";
import config from "../config";
import { lookInSession } from "../common/session";
import toast from "react-hot-toast";

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
  } catch ({ response }) {
    console.log(response);
    throw response;
  }
};

export const getBlogs = async ({ page = 1, limit = 2 }) => {
  console.log("Fetching blogs");

  try {
    const response = await endpoint.get(
      `/blogs/latest?page=${page}&limit=${limit}`
    );
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

export const getBlogsByTag = async ({ page = 1, limit = 2, tag }) => {
  console.log("Fetching blogs by Tags");
  try {
    const response = await endpoint.get(
      `/blogs?tags=${tag}&page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const search = async ({ query, page = 1, limit = 2 }) => {
  try {
    const response = await endpoint.get(
      `/search?q=${query}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch ({ response }) {
    console.log(response.errors);
  }
};

export const getBlogsOfUser = async ({ page = 1, limit = 2, user_id }) => {
  try {
    const response = await endpoint.get(
      `/blogs/user/${user_id}?page=${page}&limit=${limit}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const response = await endpoint.get(`/blogs/blog/${slug}`, {
      headers: {
        Authorization: `Bearer ${lookInSession("user").token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBlog = async ({ blog, blog_id }) => {
  try {
    const response = await endpoint.patch(`/blogs/${blog_id}`, blog, {
      headers: {
        Authorization: `Bearer ${lookInSession("user").token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const likeBlog = async (blog_id) => {
  try {
    const response = await endpoint.patch(
      `/blogs/like/${blog_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${lookInSession("user").token}`,
        },
      }
    );

    console.log(response.data);
    toast.success("Liked the blog");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unlikeBlog = async (blog_id) => {
  try {
    const response = await endpoint.patch(
      `/blogs/unlike/${blog_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${lookInSession("user").token}`,
        },
      }
    );

    console.log(response.data);
    toast.success("Unliked the blog");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
