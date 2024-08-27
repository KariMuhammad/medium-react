import { useRef, useState } from "react";
import uploadImage from "../services/upload-image";
import { updatedProfileImageUser } from "../services/users-endpoints";
import { useAuth } from "../context/auth-context";
import toast from "react-hot-toast";

/**
 * @description Image Profile for Uploading
 * @param {*} param0
 * @returns
 */
const ProfileImageField = ({ profile_img }) => {
  const { user, syncUser } = useAuth();
  const [uploadedImage, setUploadedImage] = useState(null);
  const imageRef = useRef(null);

  const handleUpload = (e) => {
    toast.loading("Uploading...");
    e.target.setAttribute("disabled", true);

    if (!uploadImage) return;

    uploadImage(uploadedImage)
      .then((url) => {
        updatedProfileImageUser(url).then((data) => {
          console.log("NEW URL", data);
          syncUser({ ...user, user: { ...user.user, profile_img: data.url } });

          toast.dismiss();
          toast.success("Image Uploaded Successfully!");
          e.target.setAttribute("disabled", false);
        });
      })
      .catch((error) => {
        e.target.setAttribute("disabled", false);
        console.log(error);
        toast.dismiss();
        toast.error("Something went wrong when uploading!");
      });

    toast.dismiss();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    imageRef.current.src = URL.createObjectURL(file);

    setUploadedImage(file);
  };

  return (
    <div className="relative">
      <label
        htmlFor="uploadImage"
        className="relative cursor-pointer rounded-full overflow-hidden"
      >
        <div className="absolute opacity-0 hover:opacity-100 w-full h-full bg-black/80 text-white grid place-content-center rounded-full">
          <i className="fi fi-rr-cloud-upload text-3xl"></i>{" "}
        </div>
        <img
          src={profile_img}
          className="w-60 h-60 rounded-full center"
          ref={imageRef}
        />
      </label>
      <input
        type="file"
        id="uploadImage"
        className="hidden"
        onChange={handleChange}
      />

      <button className="btn-light center my-4" onClick={handleUpload}>
        Change Profile Picture
      </button>
    </div>
  );
};

export default ProfileImageField;
