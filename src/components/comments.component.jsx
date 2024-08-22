import clsx from "clsx";
import { useBlogDetails } from "../context/blog-details-context";
import CommentField from "./comment-field.component";
import CommentCard from "./comment-card.component";
import { useEffect, useState } from "react";
import { getComments } from "../services/comment-endpoints";

const CommentWrapper = () => {
  const { blog, commentPanel, setCommentPanel } = useBlogDetails();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(blog._id).then((comments) => {
      setComments(comments.data);
    });
  }, []);

  return (
    <div
      className={clsx({
        "bg-white z-50 max-sm:w-full w-[30%] min-w-[350px] fixed duration-700 sm:right-0 sm:top-0 h-full overflow-y-auto overflow-x-hidden shadow-2xl p-8 px-16": true,
        "top-0 sm:right-0": commentPanel,
        "top-[100%] sm:right-[-100%]": !commentPanel,
      })}
    >
      <div>
        <h1 className="text-2xl font-bold">Comments</h1>
        <div className="flex items-center gap-3">
          <button className="text-sm font-bold">Newest</button>
          <button className="text-sm font-bold">Oldest</button>
          <hr className="border-b border-grey my-4" />
        </div>

        <button
          className="absolute top-10 right-10 p-4"
          onClick={() => setCommentPanel(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-4 my-5">
        <CommentField
          blog_id={blog._id}
          action="comment"
          setComments={setComments}
        />
      </div>

      <div className="flex flex-col gap-4 my-5">
        {comments.length &&
          comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              setComments={setComments}
              author={comment.commented_by.personal_info || {}}
            />
          ))}
      </div>
    </div>
  );
};

export default CommentWrapper;
