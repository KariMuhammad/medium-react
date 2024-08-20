import { Link } from "react-router-dom";

const BlogOptions = ({ blog, isAuthor }) => {
  return (
    <div className="relative options-menu group">
      <button className="btn-light py-2 px-4">
        <i className="fi fi-rr-menu-dots"></i>
      </button>

      <div className="options-menu-content absolute top-full w-full hidden group-hover:block">
        {isAuthor && (
          <>
            <Link to={`/editor/${blog.blog_id}/edit`} className="py-2 px-4">
              Edit
            </Link>
            <button className="py-2 px-4">Delete</button>
          </>
        )}

        {!isAuthor && (
          <>
            <button className="btn-light py-2 px-4">Report</button>
            <button className="btn-light">Follow Author</button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogOptions;
