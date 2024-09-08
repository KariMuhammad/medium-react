import date from "date-and-time";

const BlogPostCard = ({ content, author }) => {
  const {
    title,
    banner,
    description,
    publishedAt,
    tags,
    activity: { total_likes },
  } = content;
  const { fullname, profile_img } = author || {};

  const formatedDate = date.format(new Date(publishedAt), "MMM DD");
  return (
    <div className="flex gap-8 items-center justify-between border-b border-grey pb-5 mb-5">
      <div className="w-full">
        <div>
          <div className="my-4 flex items-center gap-1">
            <img src={profile_img} className="w-6 h-6 rounded-full" />

            <p className="text-sm text-gelasio line-clamp-1">{fullname} </p>
          </div>
        </div>

        <h1 className="blog-title my-4">{title}</h1>

        <p className="text-xl leading-7 md:max-[1100px]:hidden text-gelasio line-clamp-2">
          {description}
        </p>

        <div className="flex gap-4 items-center my-4">
          <p className="min-w-fit text-sm text-dark-grey">{formatedDate}</p>
          {tags[0] && <p className="btn-light py-1 px-4">{tags[0]}</p>}
          <p className="flex items-center gap-4 text-black">
            <i className="fi fi-rr-heart"></i>
            {total_likes}
          </p>
        </div>
      </div>

      <div className="h-32">
        <img src={banner} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default BlogPostCard;
