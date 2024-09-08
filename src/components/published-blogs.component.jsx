import NoDataMessage from "./nodata.component";
import PublishedBlog from "./published-blog.component";
import LoadMoreButton from "./load-more.component";
import { fetchBlogs } from "../pages/manage-blogs.page";
const PublishedBlogs = ({ blogs, setData }) => {
  const loadMoreFn = ({ page }) =>
    fetchBlogs({ page })
      .then(async (res) => {
        const data = await res.json();
        console.log("Res", data);
        setData((prev) => {
          console.log("Prev", prev);
          return {
            ...prev,
            blogs: [...prev.blogs, ...data.blogs.blogs],
            pagination: data.blogs.pagination,
          };
        });
      })
      .catch((err) => console.log(err));
  return (
    // grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
    <div className="">
      {blogs &&
        blogs.blogs.length &&
        blogs.blogs.map((blog) => <PublishedBlog key={blog.id} blog={blog} />)}

      {!blogs && <NoDataMessage message="No Published Blogs right now!" />}

      {blogs?.pagination && (
        <LoadMoreButton
          pagination={blogs.pagination}
          fetchMoreFn={loadMoreFn}
        />
      )}
    </div>
  );
};

export default PublishedBlogs;
