import dat from "date-and-time";
import { Link } from "react-router-dom";
import NotificationInteraction from "./notification-interaction.component";
import clsx from "clsx";

const NotificationCard = ({
  notify_for = {},
  from = {},
  index,
  notification,
  setNotifications,
}) => {
  const {
    personal_info: { username, profile_img },
  } = from;

  const {
    type,
    blog: { title, blog_id },
    comment,
    reply,
    createdAt,
  } = notification;

  console.log(notification);

  const formatedDate = dat.format(new Date(createdAt), "DD MMM");

  return (
    <div
      className={clsx({
        "p-6 border-b border-grey border-l-black": true,
        "border-l-2 bg-grey": !notification?.seen,
      })}
    >
      <div className="flex gap-5">
        <img src={profile_img} className="flex-none w-14 h-14 rounded-full" />

        <div className="w-full lg:max-w-lg font-normal">
          <span className="inline-block font-medium underline my-2 mr-2">
            @{username}
          </span>

          <span className="inline-block">
            {type === "like"
              ? "liked your blog"
              : type === "comment"
              ? "commented on"
              : "replied on"}
          </span>

          <div>
            {type === "like" ? (
              <Link
                to={`/blog/${blog_id}`}
                className="italic text-dark-grey hover:underline line-clamp-1"
              >
                "{title}"
              </Link>
            ) : type === "comment" ? (
              <Link
                to={`/blog/${blog_id}`}
                className="italic text-dark-grey hover:underline line-clamp-1"
              >
                "{title}"
              </Link>
            ) : (
              <p className="p-4 bg-grey rounded-md">{comment.comment}</p>
            )}
          </div>

          {type === "comment" && (
            <p className="font-gelasio m-2">{comment.comment}</p>
          )}
          {type === "reply" && (
            <p className="font-gelasio m-2">{reply.comment}</p>
          )}

          <NotificationInteraction
            type={type}
            index={index}
            comment={type === "comment" ? comment : reply} // if this notification is reply (means someone replied on your comment), so you want to reply to the reply comment
            comment_user={comment} // reply or comment
            formatedDate={formatedDate}
            notification={notification}
            setNotifications={setNotifications}
            notify_for={notify_for} // user who is notified
            from={from} // user who did the action
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
