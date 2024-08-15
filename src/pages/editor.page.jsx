//www.youtube.com/watch?v=pGFy_uGtpCA&list=PLqm86YkewF6QbR7QwqYWcAbl70Zhv0JUE&index=3
import { useState } from "react";
import NavbarEditor from "../components/navbar-editor.component";
import BlogEditorComponent from "../components/blog-editor.component";
import BlogProvider from "../context/blog-context";
import PublishForm from "../components/publish-form.component";

const EditorPage = () => {
  const [editorMode, setEditorMode] = useState("editor");
  const [blogEditor, setBlogEditor] = useState({ isReady: false });

  return (
    <div>
      <BlogProvider
        value={{ editorMode, setEditorMode, blogEditor, setBlogEditor }}
      >
        <NavbarEditor />
        {editorMode === "editor" ? <BlogEditorComponent /> : <PublishForm />}
      </BlogProvider>
    </div>
  );
};

export default EditorPage;
