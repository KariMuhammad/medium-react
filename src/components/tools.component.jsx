import Code from "@editorjs/code";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import { StyleInlineTool } from "editorjs-style";
import uploadImage from "../services/upload-image";

const uploadImageByUrl = (url) => {
  console.log(url);

  return new Promise((resolve, reject) => {
    resolve({
      success: 1,
      file: { url },
    });
  });
};

const uploadImageByFile = (image) => {
  return uploadImage(image)
    .then((url) => {
      return {
        success: 1,
        file: { url },
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: 0,
        file: { url: "" },
      };
    });
};

const tools = {
  code: Code,
  embed: Embed,
  header: {
    class: Header,
    config: {
      placeholder: "Enter a heading",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  image: {
    class: Image,
  },
  inlineCode: InlineCode,
  link: Link,
  list: {
    class: List,
    inlineToolbar: true,
  },
  marker: {
    class: Marker,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  style: {
    class: StyleInlineTool,
    config: {
      classList: [
        { name: "Normal", class: "" },
        { name: "Large", class: "large" },
        { name: "Red", class: "red" },
        { name: "Blue", class: "blue" },
        { name: "Green", class: "green" },
      ],
    },
  },
};

export default tools;
