import NoDataMessage from "./nodata.component";
import PublishedBlog from "./published-blog.component";

const DraftBlogs = ({ drafts: blogs }) => {
  console.log("Drafts Blogs", blogs);

  return (
    <div className="">
      {blogs &&
        blogs.blogs.length &&
        blogs.blogs.map((blog) => <PublishedBlog key={blog.id} blog={blog} />)}

      {!blogs && <NoDataMessage message="No Drafts Blogs right now!" />}
    </div>
  );
};

export default DraftBlogs;
