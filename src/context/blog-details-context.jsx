import { createContext, useContext } from "react";

const blogDetailsStructure = {
  blog: {
    blog_id: "",
    author: {
      fullname: "",
      username: "",
      profile_img: "",
      bio: "",
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
