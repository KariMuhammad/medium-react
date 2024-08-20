import { useState } from "react";
import { likeBlog, unlikeBlog } from "../../services/blog-endpoints";
import clsx from "clsx";
import { useAuth } from "../../context/auth-context";

const Like = ({ count, userLiked, blog, blog: { _id: blogId } }) => {
  const {
    user: { token },
  } = useAuth();

  console.log(blog);
  const [countLikes, setCountLikes] = useState(count);
  const [isLiked, setIsLiked] = useState(userLiked || false);

  const handleLikeBlog = (blogId) => (e) => {
    if (!token) return;

    if (!isLiked) {
      setIsLiked(true);
      setCountLikes((c) => c + 1);

      likeBlog(blogId)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          setIsLiked(false);
          setCountLikes((c) => c - 1);
        });
    } else {
      setIsLiked(false);
      setCountLikes((c) => c - 1);

      unlikeBlog(blogId)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          setIsLiked(true);
          setCountLikes((c) => c + 1);
        });
    }

    console.log(blogId);
  };
  return (
    <button
      className={clsx({
        "btn-light py-2 px-4": true,
        "text-red-500": isLiked,
        "bg-red/80": isLiked,
      })}
      onClick={handleLikeBlog(blogId)}
    >
      <i className={`fi fi-${isLiked ? "sr" : "rr"}-heart mr-3`}></i>
      {countLikes}
    </button>
  );
};

export default Like;
