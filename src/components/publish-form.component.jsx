import { useNavigate } from "react-router-dom";
import { useBlog } from "../context/blog-context";
import AnimationWrapper from "../common/page-animation";
import Tag from "./tags.component";
import { createBlog } from "../services/blog-endpoints";
import toast, { Toaster } from "react-hot-toast";

const PublishForm = () => {
  const navigate = useNavigate();
  const charactersLimit = 200;
  const tagsLimit = 10;

  const {
    blog,
    blog: { title, banner, description, tags },
    setBlog,
    setEditorMode,
  } = useBlog();

  const handleTitleChange = (e) => {
    const element = e.target;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;

    setBlog((blog) => ({ ...blog, title: element.value }));
  };

  const handleDescriptionChange = (e) => {
    const element = e.target;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;

    if (element.value.length > charactersLimit) {
      element.value = element.value.slice(0, charactersLimit);
      return e.preventDefault();
    }

    setBlog((blog) => ({ ...blog, description: element.value }));
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      // get the tag
      const tag = e.target.value.trim();

      if (tag) {
        setBlog((blog) => ({ ...blog, tags: tags.concat(tag) }));
        e.target.value = "";
      }
    }
  };

  const goBack = () => {
    setEditorMode("editor");
  };

  const goPublish = async (e) => {
    e.preventDefault();
    const publishLoading = toast.loading("Publishing blog...");
    try {
      await createBlog(blog);

      toast.dismiss(publishLoading);
      toast.success("Blog published successfully");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (response) {
      toast.dismiss(publishLoading);
      if (typeof response.data.errors.message == "string") {
        return toast.error(response.data.errors.message);
      }

      response.data.errors.message.forEach((error) => {
        toast.error(Object.values(error)[0]);
      });
    }
  };

  return (
    <AnimationWrapper>
      <Toaster />
      <section className="grid items-center w-screen h-screen md:grid-cols-2 gap-8">
        <div className="blog-preview bg-grey p-4 rounded-md overflow-hidden">
          <img src={banner} />

          <h2 className="text-2xl my-4 highlight">{title}</h2>
          <p>
            {description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </p>
        </div>

        {/* <hr className="border border-grey my-4" /> */}

        <div className="publish-form">
          <form onSubmit={goPublish}>
            <div className="input-field">
              <label htmlFor="title" className="text-dark-grey text-lg my-4">
                Blog title
              </label>
              <input
                id="title"
                type="text"
                className="input-box placeholder:opacity-40 pl-4"
                placeholder="enter blog title"
                defaultValue={title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="input-field my-4">
              <label
                htmlFor="description"
                className="text-dark-grey text-lg my-4"
              >
                Blog description
              </label>

              <textarea
                placeholder="enter short description for your blog..."
                className="input-box placeholder:opacity-40 pl-4 leading-7 resize-none h-32"
                onChange={handleDescriptionChange}
              ></textarea>

              <p
                className={`${
                  description.length <= 150
                    ? "text-black"
                    : description.length <= 180
                    ? "text-twitter"
                    : "text-red"
                } w-fit ml-auto`}
              >
                {description ? description.length : 0} / {charactersLimit}
              </p>
            </div>

            <hr className="border border-grey my-4" />

            <div className="blog-tags my-6">
              <label htmlFor="tags" className="text-dark-grey text-lg my-4">
                Tags
              </label>

              <p className="text-xs text-dark-grey">
                help people find your blog by adding tags. Separate tags with
                commas.
              </p>

              <input
                id="tags"
                type="text"
                className="input-box placeholder:opacity-40 pl-4 mt-4"
                onKeyDown={handleAddTag}
              />

              <div className="tags-preview my-4">
                {tags.map((tag, index) => (
                  <Tag key={index} tag={tag} tagIndex={index} />
                ))}
              </div>

              <p className="text-xs text-dark-grey w-fit ml-auto">
                <span className="font-bold">{tagsLimit - tags.length}</span>{" "}
                tags left
              </p>
            </div>

            <button className="btn-dark" type="submit">
              Publish
            </button>
            <button className="btn-light" onClick={goBack}>
              Back
            </button>
          </form>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
