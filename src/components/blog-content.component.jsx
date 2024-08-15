import date from "date-and-time";

const MinimalBlogCard = ({ blog, index }) => {
  const {
    title,
    publishedAt,
    author: { personal_info },
    blog_id: id,
  } = blog;

  return (
    <div className="flex gap-4 border-b border-grey my-6 mb-6">
      <p className="blog-index">{index < 10 ? "0" + index : index}</p>

      <div className="w-full">
        <header className="flex gap-2 items-center">
          <img
            src={personal_info.profile_img}
            className="w-6 h-6 rounded-full"
          />

          <p>{personal_info.fullname}</p>
        </header>

        <main className="my-6">
          <h1 className="blog-title">{title}</h1>
        </main>

        <footer>
          <p className="w-fit ml-auto">
            {date.format(new Date(publishedAt), "MMM DD")}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MinimalBlogCard;
