import { useAuth } from "../context/auth-context";
import { useBlogDetails } from "../context/blog-details-context";
import Bookmark from "./mini/bookmark.component";
import Like from "./mini/like.component";
import Share from "./mini/share.component";
import Comment from "./mini/comment.component";
import BlogOptions from "./mini/blog-options.component";

const BlogInteraction = () => {
  const { user } = useAuth();
  const blogDetails = useBlogDetails();
  console.log("Blog Details", blogDetails);

  const isAuthor =
    user.user.personal_info.username ===
    blogDetails.blog.author.personal_info.username;

  return (
    <div className="blog-interaction my-7">
      <hr className="border-b border-grey" />
      <div className="flex items-center my-4 justify-end md:justify-between">
        <div className="hidden blog-stats-l md:flex items-center gap-4">
          <Like
            userLiked={blogDetails.blog.liked}
            count={blogDetails.blog.activity.total_likes}
            blogId={blogDetails.blog._id}
            blog={blogDetails.blog}
          />
          <Comment count={blogDetails.blog.comments.length} />
        </div>

        <div className="blog-stats-r flex items-center gap-4">
          <Share
            blogId={blogDetails.blog.blog_id}
            title={blogDetails.blog.title}
          />
          <div className="hidden md:block">
            <Bookmark blogId={blogDetails.blog.blog_id} />
          </div>

          <BlogOptions blog={blogDetails.blog} isAuthor={isAuthor} />
        </div>
      </div>

      <hr className="border-b border-grey" />
    </div>
  );
};

export default BlogInteraction;
