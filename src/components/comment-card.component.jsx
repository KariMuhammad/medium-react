import clsx from "clsx";
import date from "date-and-time";
import { useState } from "react";
import toast from "react-hot-toast";
import { createReply } from "../services/comment-endpoints";
import AnimationWrapper from "../common/page-animation";

const addReplyToComments = (comments, comment_id, child) => {
  return comments.map((item) => {
    if (item._id === comment_id) {
      return { ...item, children: [...item.children, child] };
    } else if (item.children && item.children.length > 0) {
      return {
        ...item,
        children: addReplyToComments(item.children, comment_id, child),
      };
    } else {
      return item;
    }
  });
};

const CommentCard = ({ comment, author, setComments }) => {
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [reply, setReply] = useState("");

  const toggleShowReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const handleReply = () => {
    setShowReply((prev) => !prev);
  };

  const handleLike = () => {};

  const submitReply = async () => {
    try {
      const data = await createReply({
        comment_id: comment._id,
        data: { content: reply },
      });

      console.log("Data Reply", data);
      const child = {
        ...data._doc,
        commented_by: data.commented_by,
      };

      setComments((prev) => ({
        comments: addReplyToComments(prev.comments, comment._id, child),
        pagination: prev.pagination,
      }));

      setReply("");
      setShowReply(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <AnimationWrapper>
      <div
        className={clsx({
          "relative comment-card my-4": true,
        })}
      >
        <div className="relative comment-card_header flex gap-2">
          <img src={author.profile_img} className="w-14 h-14 rounded-full" />

          <div className="comment-card_header-info">
            <h1 className="text-xl font-bold capitalize">{author.fullname}</h1>
            <p className="text-sm text-dark-grey">
              {date.format(new Date(comment.commentedAt), "MMM DD, YYYY")}
            </p>
          </div>

          <div className="comment-card_header-options absolute top-[1vw] right-[2vw]">
            <button>
              <i className="fi fi-rr-menu-dots"></i>
            </button>
          </div>
        </div>

        {/* create a timeline for track lines of comments */}
        <div className="relative comment-card_body p-4">
          <p className="text-lg">{comment.comment}</p>
        </div>

        <hr className="border-b border-grey" />

        <div className="comment-card_footer flex items-center gap-4 p-4 justify-between">
          <div className="flex gap-4 items-center" onClick={handleLike}>
            <button className="text-lg font-bold text-dark-grey">
              <i className="fi fi-rr-hands-clapping text-2xl"></i> 5
            </button>
            <button
              className="text-lg font-bold text-dark-grey ml-4"
              onClick={toggleShowReplies}
            >
              <i className="fi fi-rr-comment text-xl mx-2"></i>{" "}
              {comment.children.length}
            </button>
          </div>
          <button
            className="text-xl font-bold text-dark-grey capitalize"
            onClick={handleReply}
          >
            reply
          </button>
        </div>

        <div
          className={clsx({
            hidden: !showReply,
            block: showReply,
          })}
        >
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className={clsx({
              "input-box pl-5 mb-5 placeholder:text-dark-grey resize-none overflow-auto h-[150px]": true,
            })}
            placeholder="Leave a reply..."
          ></textarea>
          <button className="btn-dark" onClick={submitReply}>
            reply
          </button>
        </div>

        <div
          className={clsx({
            "comment-card_replies": true,
            block: showReplies,
            hidden: !showReplies,
            "border-grey border-l-4 ml-5 pl-2": comment.children.length > 0,
            // create a branch style for the comment card replies
          })}
        >
          {comment.children.length > 0 &&
            comment.children.map((reply) => (
              <CommentCard
                key={reply._id}
                comment={reply}
                setComments={setComments}
                author={reply.commented_by.personal_info}
              />
            ))}
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default CommentCard;
