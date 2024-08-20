import { Link } from "react-router-dom";

const Share = ({ blogId, title }) => {
  return (
    <Link
      to={`https://twitter.com/intent/tweet?text=${title}&url=${location.href}`}
    >
      <button className="btn-light py-2 px-4">
        <i className="fi fi-rr-share mr-3"></i>
      </button>
    </Link>
  );
};

export default Share;
