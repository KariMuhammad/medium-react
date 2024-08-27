import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import BlogPostCard from "./blog-post.component";
import LoadMoreButton from "./load-more.component";
import Loader from "./loader.component";
import NoDataMessage from "./nodata.component";

const ListBlogs = ({
  blogs,
  pagination,
  fetchMore,
  user_id,
  className = "",
  itemClassname = "",
}) => {
  return (
    <div className={`home-blogs ${className}`}>
      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog, i) => (
          <AnimationWrapper
            className={itemClassname}
            key={blog.blog_id}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/blog/${blog.blog_id}`} className="blog-link">
              <BlogPostCard content={blog} author={blog.author} />
            </Link>
          </AnimationWrapper>
        ))}

      {!blogs && <Loader />}

      {blogs && !blogs.length && (
        <NoDataMessage message="No blogs found for this tag" />
      )}

      {pagination && (
        <LoadMoreButton
          pagination={pagination}
          fetchMoreFn={user_id ? fetchMore(user_id) : fetchMore()}
        />
      )}
    </div>
  );
};

export default ListBlogs;
