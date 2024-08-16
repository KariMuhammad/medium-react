import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreButton from "../components/load-more.component";
import { search } from "../services/blog-endpoints";
import BlogPostCard from "../components/blog-post.component";
import UserCard from "../components/usercard.component";

const SearchPage = () => {
  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchMore = ({ page }) => {
    search({ query: searchParams.get("q"), page }).then((data) => {
      setData((prev) => ({
        ...prev,
        blogs: {
          blogs: [...prev.blogs.blogs, ...data.data.blogs.blogs],
          pagination: data.data.blogs.pagination,
        },
      }));
    });
  };

  useEffect(() => {
    search({ query: searchParams.get("q") }).then((data) => {
      setData(data.data);
    });
  }, [searchParams.get("q")]);

  const { blogs } = data?.blogs || {};

  console.log("DATA", data);

  return (
    <AnimationWrapper>
      <section className="h-cover flex gap-8 mx-auto">
        <div className="blogs w-full">
          <InPageNavigation
            headings={[
              `Search results for "${searchParams.get("q")}"`,
              "Accounts Matched",
            ]}
            hiddens={["Accounts Matched"]}
          >
            <div className="blogs-result">
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

              {data && data?.blogs?.pagination?.nextPage && (
                <LoadMoreButton
                  pagination={data?.blogs?.pagination}
                  fetchMoreFn={fetchMore}
                />
              )}
            </div>
            <div className="accounts-result">
              <h1>Accounts</h1>
            </div>
          </InPageNavigation>
        </div>
        {/* ./Blogs */}

        <div className="min-w-[40%] lg:min-w-[270px] max-w-min border-l border-grey pl-8 pt-5 max-md:hidden">
          <h1 className="mb-10">Accounts Matched</h1>

          {data?.users &&
            data.users.map((user) => <UserCard key={user._id} user={user} />)}
        </div>
        {/* ./Sidebar */}
      </section>
    </AnimationWrapper>
  );
};

export default SearchPage;
