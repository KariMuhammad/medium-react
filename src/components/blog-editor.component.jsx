import toast from "react-hot-toast";
import EditorJS from "@editorjs/editorjs";
import blogBanner from "../imgs/blog banner.png";
import uploadImage from "../services/upload-image";
import { useBlog } from "../context/blog-context";
import { useEffect } from "react";
import tools from "./tools.component";

export let editor;

export default function BlogEditor() {
  const {
    blog,
    blog: { banner, title, content },
    setBlog,
    blogEditor,
    setBlogEditor,
    blog_id,
  } = useBlog();

  console.log("ID", blog_id, "Blog", blog);

  const uploadImageFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const toastLoading = toast.loading("Uploading image...");
      uploadImage(file)
        .then((url) => {
          toast.dismiss(toastLoading);
          toast.success("Image uploaded successfully");
          setBlog((blog) => ({ ...blog, banner: url }));
        })
        .catch((error) => {
          toast.dismiss();
          toast.error("Failed to upload image");
        });
    }
  };

  const handleTitleChange = (e) => {
    const element = e.target;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;

    // Set the title preview
    setBlog((blog) => ({ ...blog, title: element.value }));
  };

  const handleImageError = (e) => {
    e.target.src = blogBanner; // default image
  };

  useEffect(() => {
    if (blogEditor.isReady) return;

    editor = new EditorJS({
      holder: "editor-content",
      placeholder: "Write something awesome...",
      data: { blocks: content || [] },
      tools: tools,
    });

    setBlogEditor(editor);
  }, [content, tools]);

  return (
    <section className="editor">
      <div className="wrapper max-w-[900px] w-full">
        <div className="blog-banner relative aspect-video border border-grey hover:opacity-80 cursor-pointer">
          <label htmlFor="blog-banner" className="absolute inset-0">
            <img src={banner || blogBanner} onError={handleImageError} />
            <input
              name="banner"
              id="blog-banner"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={uploadImageFile}
              hidden
            />
          </label>
        </div>

        <div className="banner-title my-4">
          <textarea
            name="title"
            defaultValue={title}
            className="text-4xl placeholder:opacity-40 transition-all outline-none p-1 leading-10 text-black w-full h-20 resize-none overflow-hidden bg-transparent"
            placeholder="Blog Title"
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            onChange={handleTitleChange}
          ></textarea>
        </div>

        <div name="content" id="editor-content" className="blog-content"></div>
      </div>
    </section>
  );
}
