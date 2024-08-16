import AnimationWrapper from "../common/page-animation";
import BlogPostCard from "./blog-post.component";
import LoadMoreButton from "./load-more.component";
import Loader from "./loader.component";
import NoDataMessage from "./nodata.component";

const ListBlogs = ({ blogs, pagination, fetchMore }) => {
  return (
    <div className="home-blogs">
      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog, i) => (
          <AnimationWrapper key={blog.blog_id} transition={{ delay: i * 0.1 }}>
            <BlogPostCard content={blog} author={blog.author.personal_info} />
          </AnimationWrapper>
        ))}

      {!blogs && <Loader />}

      {blogs && !blogs.length && (
        <NoDataMessage message="No blogs found for this tag" />
      )}

      {pagination && (
        <LoadMoreButton pagination={pagination} fetchMoreFn={fetchMore()} />
      )}
    </div>
  );
};

export default ListBlogs;
