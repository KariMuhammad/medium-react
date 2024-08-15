import axios from "axios";
import config from "../config";

const uploadImage = async (imageFile) => {
  let url = null;

  await axios
    .get(`${config.serverDomain}/get-s3-url`)
    .then(async ({ data: { url: bucketUrl } }) => {
      console.log("[1]", bucketUrl);

      await axios({
        method: "PUT",
        url: bucketUrl,
        data: imageFile,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        url = bucketUrl.split("?")[0];
        // buecket which we created in backend, if we didn't uploaded any image to it, it will be empty after expiration time we determine it in backend
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return url;
};

export default uploadImage;
