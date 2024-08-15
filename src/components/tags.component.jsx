import { useBlog } from "../context/blog-context";

const Tag = ({ tag, tagIndex }) => {
  const {
    blog: { tags },
    setBlog,
  } = useBlog();

  const enableEdit = (e) => {
    e.target.setAttribute("contenteditable", true);
  };

  const deleteTag = (e) => {
    e.preventDefault();
    const newTags = tags.filter((t) => t !== tag);

    setBlog((blog) => ({ ...blog, tags: [...newTags] }));
  };

  const handleChangeTag = (e) => {
    const element = e.target;
    const value = element.innerText.trim();

    if (e.key === "Enter" || e.key === "Escape") {
      if (value) {
        element.setAttribute("contenteditable", false);
        tags[tagIndex] = value;

        setBlog((blog) => ({ ...blog, tags: [...tags] }));
      }
    }
  };
  return (
    <div className="relative inline-block rounded-full overflow-hidden">
      <p
        className="py-2 px-4 pr-8 mx-2 bg-black text-white outline-none"
        onDoubleClick={enableEdit}
        onKeyDown={handleChangeTag}
      >
        {tag}
      </p>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={deleteTag}
      >
        <i className="fi fi-rr-cross text-white text-sm pointer-events-none"></i>
      </button>
    </div>
  );
};

export default Tag;
