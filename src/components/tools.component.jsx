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
import CodeBox from "@bomdi/codebox";

import config from "../config";

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
  code: {
    class: CodeBox,
    config: {
      useDefaultTheme: "light",
    },
  },
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
    config: {
      uploader: {
        uploadByFile: uploadImageByFile,
        uploadByUrl: uploadImageByUrl,
      },
    },
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

export const readOnlyTools = {
  embed: Embed,
  header: {
    class: Header,
    config: {
      placeholder: "Enter a heading",
      levels: [2, 3, 4],
      defaultLevel: 2,
      readOnly: true,
    },
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile: uploadImageByFile,
        uploadByUrl: uploadImageByUrl,
      },
      readOnly: true,
    },
  },
  inlineCode: InlineCode,
  link: Link,
  list: {
    class: List,
    inlineToolbar: true,
    readOnly: true,
  },
  marker: {
    class: Marker,
    readOnly: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    readOnly: true,
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
      readOnly: true,
    },
  },
};

export default tools;
