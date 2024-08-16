import AnimationWrapper from "../common/page-animation";
import MinimalBlogCard from "./blog-content.component";
import Loader from "./loader.component";
import NoDataMessage from "./nodata.component";

const TrendBlogs = ({ trendingBlogs }) => {
  return (
    <div className="trending-blogs">
      <h1 className="text-2xl mb-8 flex items-center gap-2">
        Trends <i className="fi fi-rr-arrow-trend-up text-3xl"></i>
      </h1>

      {!trendingBlogs && <Loader />}

      {trendingBlogs &&
        trendingBlogs.length > 0 &&
        trendingBlogs.map((blog, index) => {
          return (
            <AnimationWrapper
              key={blog.blog_id}
              transition={{ delay: index * 0.1 }}
            >
              <MinimalBlogCard blog={blog} index={index + 1} />
            </AnimationWrapper>
          );
        })}

      {trendingBlogs && !trendingBlogs.length && (
        <NoDataMessage message="No trending blogs found" />
      )}
    </div>
  );
};

export default TrendBlogs;
