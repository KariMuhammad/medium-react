import { createContext, useContext, useEffect, useState } from "react";
import { getBlogBySlug } from "../services/blog-endpoints";

const BlogStructure = {
  blog: {
    title: "",
    banner: "",
    description: "",
    content: [], // editorjs content
    tags: [],
    personal_info: {
      author: [],
    },
  },

  setBlog: () => {},
};

/**
 * Context Holds many things
 * 1. Blog Data
 * 2. Editor Mode
 * 3. EditorJS instance
 */
export const BlogContext = createContext(BlogStructure);

/**
 * blog_id is undefined if we create a new blog, but it will be defined if we are editing a blog
 * @param {*} param0
 * @returns
 */
export default function BlogProvider({ value, children, blog_id = null }) {
  const [blog, setBlog] = useState(BlogStructure.blog);

  // const updateBlog = (key, value) => {
  //   setBlog((prev) => ({ ...prev, [key]: value }))};
  // }

  useEffect(() => {
    if (!blog_id) return;

    // fetch blog data from server
    getBlogBySlug(blog_id).then((data) => {
      console.log("--", data.blog._doc);

      setBlog(data.blog._doc);
    });
  }, [blog_id]);

  console.log(blog);

  return (
    <BlogContext.Provider value={{ blog, setBlog, ...value }}>
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
