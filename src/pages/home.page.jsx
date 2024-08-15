import { useCallback, useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation, {
  activeButtonRef,
} from "../components/inpage-navigation.component";
import {
  getBlogs,
  getBlogsByTag,
  getTrendingBlogs,
} from "../services/blog-endpoints";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogCard from "../components/blog-content.component";

import Loader from "../components/loader.component";

import clsx from "clsx";
import NoDataMessage from "../components/nodata.component";
import LoadMoreButton from "../components/load-more.component";

const tags = ["anime", "principal", "morals", "friendship", "#mongodb"];

const HomePage = ({}) => {
  const [data, setData] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);
  const [pageState, setPageState] = useState("home");

  const fetchLatestBlogs = ({ page = 1, append = false }) => {
    getBlogs({ page: page }).then((data) => {
      if (append)
        setData((prev) => ({
          ...prev,
          blogs: [...prev.blogs, ...data.blogs],
          pagination: data.pagination,
        }));
      else setData(data);
    });
  };

  const fetchTrendingBlogs = () => {
    getTrendingBlogs().then((data) => {
      setTrendingBlogs(data.blogs);
    });
  };

  const fetchBlogsByTag = ({ page = 1, append = false }) => {
    console.log(pageState);
    getBlogsByTag({ tag: pageState, page: page }).then((data) => {
      if (append)
        setData((prev) => ({
          blogs: [...prev.blogs, ...data.blogs],
          pagination: data.pagination,
        }));
      else setData(data);
    });
  };

  let fetchMore = useCallback(() => {
    if (pageState === "home") return fetchLatestBlogs;
    else return fetchBlogsByTag;
  }, [pageState]);

  useEffect(() => {
    activeButtonRef.current?.click();

    if (pageState === "home") fetchLatestBlogs({});
    else fetchBlogsByTag({});

    if (!trendingBlogs) fetchTrendingBlogs();
  }, [pageState]);

  const loadDataByTag = (tag) => (e) => {
    tag = tag.toLowerCase();
    if (pageState === tag) return setPageState("home");

    setData(null);
    setPageState(tag);
  };

  const { blogs } = data || {};

  console.log(data);
  console.log(fetchMore);

  return (
    <AnimationWrapper>
      <section className="h-cover flex gap-4">
        <div className="blogs w-full">
          <InPageNavigation
            headings={[pageState, "trending blogs"]}
            hiddens={["trending blogs"]}
          >
            <div className="home-blogs">
              {blogs &&
                blogs.length > 0 &&
                blogs.map((blog, i) => (
                  <AnimationWrapper
                    key={blog.blog_id}
                    transition={{ delay: i * 0.1 }}
                  >
                    <BlogPostCard
                      content={blog}
                      author={blog.author.personal_info}
                    />
                  </AnimationWrapper>
                ))}

              {!blogs && <Loader />}

              {blogs && !blogs.length && (
                <NoDataMessage message="No blogs found for this tag" />
              )}

              {data && data.pagination && (
                <LoadMoreButton
                  pagination={data?.pagination}
                  fetchMoreFn={fetchMore()}
                />
              )}
            </div>
            {/* ./Latest Blogs */}

            <div className="trending-blogs">
              <h1 className="text-3xl mb-8 flex items-center gap-2">
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
            {/* ./Trending Blogs */}
          </InPageNavigation>
        </div>
        {/* ./blogs side */}

        <div className="min-w-[40%] lg:min-w-[320px] max-w-min border-l border-grey pl-8 pt-5 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div className="tags">
              <h1 className="text-xl font-medium mb-8">
                Stories from all Interests
              </h1>

              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <button
                    key={index}
                    className={clsx({
                      tag: true,
                      "bg-black text-white": pageState === tag.toLowerCase(),
                    })}
                    onClick={loadDataByTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="trends">
              <h1>
                Trends <i className="fi fi-rr-arrow-trend-up"></i>
              </h1>

              {!trendingBlogs && <Loader />}
              {trendingBlogs?.map((blog, index) => {
                return (
                  <MinimalBlogCard
                    key={blog.blog_id}
                    blog={blog}
                    index={index + 1}
                  />
                );
              })}

              {trendingBlogs && trendingBlogs.length === 0 && (
                <NoDataMessage message="No trending blogs found" />
              )}
            </div>
          </div>
        </div>
        {/* ./filter + trending blogs */}
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
