import toast from "react-hot-toast";
import { useBlog } from "../context/blog-context";
import { blogSchema, saveToDraftSchema } from "../validations/index";
import { createBlog, updateBlog } from "../services/blog-endpoints";
export default function NavbarEditor() {
  const {
    blog,
    blog: { title, content, banner },
    setBlog,
    blogEditor,
    setEditorMode,

    blog_id, // this means that we will update not create the blog
  } = useBlog();

  const handleSwitchPublishForm = async () => {
    // save blog editor content
    await blogEditor.save().then((outputData) => {
      setBlog((blog) => ({ ...blog, content: outputData.blocks }));

      blogSchema
        .validate({ title, content: outputData.blocks, banner })
        .then(() => {
          setEditorMode("publish");
        })
        .catch((error) => {
          console.dir(error);
          toast.dismiss();
          toast.error(error.message);
        });
    });
  };

  const saveDraft = async (e) => {
    saveToDraftSchema
      .validate({ title })
      .then(async () => {
        try {
          const loading = toast.loading("Saving draft...");
          console.log(blog);

          if (blog_id) {
            delete blog["blog_id"];
            delete blog["updatedAt"];

            await updateBlog({ blog: { ...blog, draft: "true" }, blog_id });
          } else await createBlog({ ...blog, draft: "true" });
          toast.dismiss(loading);
          toast.success("Draft saved successfully");
        } catch ({ response }) {
          console.log(response);
          toast.dismiss();
          toast.error("Failed to save draft");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <nav className="navbar justify-between">
      <h2 className="blog-title text-xl line-clamp-1 overflow-ellipsis">
        {title || "New Blog"}
      </h2>

      <div className="nabnar-menu flex gap-4">
        <button className="btn-dark" onClick={handleSwitchPublishForm}>
          Publish
        </button>
        <button className="btn-light" onClick={saveDraft}>
          Save Draft
        </button>
      </div>
    </nav>
  );
}
