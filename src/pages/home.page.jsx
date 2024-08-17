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

import ListBlogs from "../components/list-blogs.component";
import TrendBlogs from "../components/trend-blogs.component";
import ListTags from "../components/list-tags.component";

const tags = ["anime", "article", "tech", "friendship", "node"];

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

  const fetchBlogsByTag = ({ page = 1, append = false, tag = pageState }) => {
    console.log(tag);

    getBlogsByTag({ tag, page }).then((data) => {
      if (append)
        setData((prev) => ({
          blogs: [...prev.blogs, ...data.blogs],
          pagination: data.pagination,
        }));
      else setData(data);
    });
  };

  const loadDataByTag = (tag) => (e) => {
    tag = tag.toLowerCase();
    if (pageState === tag) return setPageState("home");

    setData(null);
    setPageState(tag);
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

  const { blogs } = data || {};

  console.log(data);

  return (
    <AnimationWrapper>
      <section className="h-cover flex gap-4">
        <div className="blogs w-full">
          <InPageNavigation
            headings={[pageState, "trending blogs"]}
            hiddens={["trending blogs"]}
          >
            <ListBlogs
              blogs={blogs}
              pagination={data?.pagination}
              fetchMore={fetchMore}
            />
            {/* ./Latest Blogs */}

            <TrendBlogs trendingBlogs={trendingBlogs} />
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
                <ListTags
                  tags={tags}
                  loadData={loadDataByTag}
                  pageState={pageState}
                />
              </div>
            </div>
            <div className="trends">
              <TrendBlogs trendingBlogs={trendingBlogs} />
            </div>
          </div>
        </div>
        {/* ./filter + trending blogs */}
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
