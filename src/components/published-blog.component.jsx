import clsx from "clsx";
import dat from "date-and-time";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteBlog } from "../services/blog-endpoints";
import toast from "react-hot-toast";

const BlogStats = ({ stats }) => {
  return (
    <div className="flex gap-5 justify-center items-center shadow-md p-5">
      {Object.keys(stats).map((key) => {
        if (!key.includes("total_parent"))
          return (
            <div className="flex-col items-center justify-center text-center">
              <p className="text-black lg:text-xl xl:text-2xl">{stats[key]}</p>
              <p className="text-dark-grey capitalize lg:text-lg xl:text-xl">
                {key.split("_")[1]}
              </p>
            </div>
          );
      })}
    </div>
  );
};

const PublishedBlog = ({ blog }) => {
  const [showStats, setShowStats] = useState(false);

  console.log(blog);
  const { banner, title, blog_id, publishedAt, activity } = blog;
  const formatedDate = dat.format(new Date(publishedAt), "MMM DD, YYYY");

  const handleDelete = () => {
    try {
      deleteBlog(blog._id)
        .then((_) => {
          toast.success("Blog deleted");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete blog");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex gap-10 items-center mb-5">
      <img
        src={banner}
        className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none object-cover bg-grey"
      />

      <div className="info w-full flex flex-col items-center lg:flex-row lg:justify-between">
        <div className="w-full flex-col justify-center">
          <Link
            to={`/blog/${blog.blog_id}`}
            className="blog-title hover:underline mb-5"
          >
            {title}
          </Link>
          <p className="line-clamp-1 text-dark-grey">
            Published on {formatedDate}
          </p>

          <div className="w-full flex gap-5 mt-5">
            <Link
              to={`/editor/${blog_id}/edit`}
              className="btn btn-primary hover:bg-primary-dark hover:underline"
            >
              Edit
            </Link>

            {/* Stats */}
            <button
              onClick={() => setShowStats((p) => !p)}
              className="bg-transparent lg:hidden"
            >
              <i className="fi fi-rr-stats"></i>
            </button>

            {/* Delete */}
            <button
              onClick={handleDelete}
              className="bg-transparent text-red hover:underline"
            >
              Delete
            </button>
          </div>
        </div>

        <div
          className={clsx({
            "max-md:hidden": showStats ? false : true,
            "lg:block": true,
            hidden: !showStats,
            block: showStats,
          })}
        >
          <BlogStats stats={activity} />
        </div>
      </div>
    </div>
  );
};

export default PublishedBlog;
