import { useEffect, useRef, useState } from "react";
import date from "date-and-time";
import { Link, useParams } from "react-router-dom";
import Editor from "@editorjs/editorjs";
import { getBlogBySlug, getBlogsByTag } from "../services/blog-endpoints";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import BlogDetailsProvider from "../context/blog-details-context";
import BlogInteraction from "../components/blog-interaction.component";
import ListBlogs from "../components/list-blogs.component";
import { readOnlyTools } from "../components/tools.component";
import CommentWrapper from "../components/comments.component";

const BlogStructure = {
  title: "",
  description: "",
  content: [],
  tags: [],
  author: {},
  comments: [],
  banner: "",
  publishedAt: "",
};

const Blog = () => {
  const { id } = useParams();
  const blogContentRef = useRef(null);
  const [_, setRender] = useState(0);
  const [blog, setBlog] = useState(BlogStructure);
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [commentPanel, setCommentPanel] = useState(true);

  console.log("S", similarBlogs);

  const triggerReRender = () => {
    setRender((prev) => prev + 1);
  };

  // when blogcontent mounted, re-render component

  useEffect(() => {
    if (!blogContentRef.current) {
      getBlogBySlug(id)
        .then((data) => {
          console.log(data.blog);

          const blog = data.blog._doc;
          setBlog({ ...blog, liked: data.blog.liked });

          getBlogsByTag({ tag: blog.tags, limit: 4 }).then((data) => {
            setSimilarBlogs(
              data.blogs.filter((b) => b.blog_id !== blog.blog_id)
            );
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    console.log(blog.content);

    if (blogContentRef.current) {
      new Editor({
        holder: blogContentRef.current,
        readOnly: true,
        data: { blocks: blog.content },
        tools: readOnlyTools,
      });
    }
  }, [_]);

  if (!blog.title) return <Loader />;

  const { title, description, banner, author, publishedAt } = blog;
  const { fullname, username, profile_img, bio } = author || {};

  if (_ == 0) {
    triggerReRender();
  }

  return (
    <AnimationWrapper>
      <BlogDetailsProvider
        value={{ blog, setBlog, commentPanel, setCommentPanel }}
      >
        <CommentWrapper />

        <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
          <div className="blog_banner">
            <img src={banner} />
          </div>
          <div className="blog_header">
            <h2 className="leading-10 my-4 text-[#242424]">{title}</h2>

            <p className="text-2xl text-dark-grey -mt-4 mb-5">{description}</p>

            <div className="blog_header-user flex align-items gap-4">
              <img src={profile_img} className="w-11 h-11 rounded-full" />

              <Link to={`/user/${username}`}>
                <div className="user-info">
                  <h1 className="text-[#242424] capitalize text-xl">
                    {fullname}
                  </h1>
                  <p className="text-sm text-dark-grey">
                    Published at{" "}
                    {date.format(new Date(publishedAt), "MMM DD, YYYY")}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="blog-interaction">
            <BlogInteraction />
          </div>

          <div id="blogcontent" ref={blogContentRef}></div>

          <div className="blog-interaction">
            <BlogInteraction />
          </div>
        </div>

        <div className="center py-10 max-lg:px-[5vw] border-t border-dark-grey">
          <div className="max-w-[900px] mx-auto">
            <div className="author-info">
              <div className="user-info_header">
                <img
                  src={profile_img}
                  className="w-16 h-16 rounded-full mb-5"
                />

                <div className="user-info flex flex-col gap-4 md:flex-row items-start justify-between">
                  <div className="user-info_l font-medium">
                    <p className="text-2xl md:text-3xl font-medium line-clamp-1">
                      Written by{" "}
                      <Link
                        to={`/user/${username}`}
                        className="capitalize text-2xl md:text-3xl font-medium"
                      >
                        {fullname}
                      </Link>
                    </p>
                    <p className="text-dark-grey my-3">1K followers</p>

                    <p className="text-slate-600 line-clamp-2">{bio}</p>
                  </div>
                  <div className="user-info_r flex items-start gap-3">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                      Follow
                    </button>

                    <button className="w-10 h-10 text-white bg-green-600 hover:bg-green-700 rounded-full">
                      <i className="fi fi-rr-envelope-plus text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>

              <hr className="my-10 border-t border-grey" />

              <div className="user-info_blogs">
                <h5 className="text-xl font-medium">
                  More from{" "}
                  <span className="inline-block text-xl font-medium capitalize">
                    {fullname}
                  </span>
                </h5>
              </div>
            </div>

            <div className="recommendation">
              <div>
                <ListBlogs
                  blogs={similarBlogs}
                  className="flex justify-evenly flex-wrap gap-5"
                  itemClassname="w-full md:w-1/2 lg:w-1/3"
                />
              </div>
            </div>
          </div>
        </div>
      </BlogDetailsProvider>
    </AnimationWrapper>
  );
};

export default Blog;
