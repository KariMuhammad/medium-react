import { useState } from "react";
import { createComment } from "../services/comment-endpoints";
import toast from "react-hot-toast";

const CommentField = ({ action, blog_id, setComments }) => {
  const [comment, setComment] = useState("");

  const submit = () => {
    if (action === "comment") {
      return createComment({ blog_id, data: { content: comment } })
        .then((data) => {
          toast.success("Comment added successfully");
          console.log("Data", data);
          setComments((prev) => ({
            comments: [data.comment._doc, ...prev.comments],
            pagination: data.pagination,
          }));
          setComment("");
        })
        .catch((errors) => {
          console.log(errors);
          toast.error(errors.message);
        });
    }

    if (action === "reply") {
      return createReply({
        blog_id: blog.id,
        comment_id: comment.id,
        data: { content: "Hello" },
      });
    }
  };

  return (
    <div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="input-box pl-5 mb-5 placeholder:text-dark-grey resize-none overflow-auto h-[150px]"
        placeholder="Leave a comment..."
      ></textarea>

      <button className="btn-dark" onClick={submit}>
        {action}
      </button>
    </div>
  );
};

export default CommentField;
