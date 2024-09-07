import { useState } from "react";
import CommentField from "./comment-field.component";
import clsx from "clsx";
import { createReply, deleteComment } from "../services/comment-endpoints";
import { Link } from "react-router-dom";

const NotificationInteraction = ({
  type,
  index,
  comment,
  comment_user,
  formatedDate,
  notification,
  setNotifications,
  notify_for,
  from,
}) => {
  if (type === "like") return <span>{formatedDate}</span>;

  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");

  const {
    personal_info: { username, profile_img },
  } = notify_for || {};

  const handleReply = () => {
    setShowReply((prev) => !prev);
  };

  const submitReply = async () => {
    try {
      const data = await createReply({
        comment_id: comment._id,
        data: { content: reply },
      });

      console.log("Data Reply", data);
      // sometimes ._doc, and sometimes not

      const child = {
        ...(data._doc || data),
        commented_by: data.commented_by,
      };

      setReply("");
      setShowReply(false);

      setNotifications((prev) => {
        prev.notifications[index].comment.reply = child;
        console.log("BEFORE", notification);
        notification.comment.reply = child;
        console.log("AFTER", notification);

        return {
          notifications: [...prev.notifications],
          pagination: prev.pagination,
        };
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setShowReply(false);
      setReply("");
    }
  };

  const handleDelete =
    (comment, reply = false) =>
    (ev) => {
      console.log(comment);
      deleteComment({ id: comment._id }).then((data) => {
        setNotifications((prev) => {
          if (reply) {
            prev.notifications[index].comment.reply = null;
          } else {
            prev.notifications.splice(index, 1);
          }

          return { ...prev };
        });
      });
    };

  return (
    <>
      <div className="flex gap-5 mt-10">
        <span>{formatedDate}</span>

        <div className="flex gap-5">
          {notification.comment && !notification.comment.reply && (
            <button
              onClick={handleReply}
              className="underline text-dark-grey hover:text-black"
            >
              Reply
            </button>
          )}
          {type === "reply" && (
            <button
              onClick={handleDelete(comment_user)}
              className="underline text-dark-grey hover:text-black"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {showReply && (
        // same as in comment-card.component.jsx
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
      )}

      {notification.comment.reply && (
        <div className="comment-card_replies py-4">
          <div className="w-full flex gap-4">
            <img src={profile_img} className="w-7 h-7 rounded-full" />

            <div className="w-full">
              <Link
                to={`/user/${username}`}
                className="inline-block font-medium underline"
              >
                @{username}
              </Link>
              <span className="inline-block font-medium">replied to</span>
              <span className="inline-block italic text-dark-grey">
                {from.personal_info.username}
              </span>
            </div>
          </div>

          <p className="font-gelasio p-4 bg-grey">
            {notification.comment.reply.comment}
          </p>

          <button
            onClick={handleDelete(notification.comment.reply, true)}
            className="block w-fit underline text-dark-grey hover:text-black"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default NotificationInteraction;
