import { createContext, useContext } from "react";

const blogDetailsStructure = {
  blog: {
    blog_id: "",
    author: {
      personal_info: { fullname: "", username: "", profile_img: "", bio: "" },
    },
    activity: {},
  },
  setBlog: () => {},
};

const BlogDetailsContext = createContext(blogDetailsStructure);

const BlogDetailsProvider = ({ children, value }) => {
  return (
    <BlogDetailsContext.Provider value={value}>
      {children}
    </BlogDetailsContext.Provider>
  );
};

export default BlogDetailsProvider;
export const useBlogDetails = () => useContext(BlogDetailsContext);
