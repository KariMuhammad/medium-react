import { createContext, useContext, useState } from "react";

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

export default function BlogProvider({ value, children }) {
  const [blog, setBlog] = useState(BlogStructure.blog);

  // const updateBlog = (key, value) => {
  //   setBlog((prev) => ({ ...prev, [key]: value }))};
  // }

  console.log(blog);

  return (
    <BlogContext.Provider value={{ blog, setBlog, ...value }}>
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
