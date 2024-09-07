import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/auth-context";
import { toast } from "react-hot-toast";

import Loader from "../components/loader.component";
import InputBox from "../components/input.component";
import { getProfileUser, updateProfileUser } from "../services/users-endpoints";
import ProfileImageField from "../components/profile-image-field.component";

const ProfileEditor = () => {
  const { user, syncUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const formRef = useRef();

  const {
    user: {
      user: { fullname, email, username, bio, profile_img },
    },
  } = useAuth();

  const handleSubmit = (e) => {
    toast.loading("Updating profile...");
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const form = [];

    for (let [key, value] of formData.entries()) {
      if (value) form[key] = value;
    }

    updateProfileUser(form)
      .then((data) => {
        console.log("Incoming Data", data);
        syncUser({
          ...user,
          user: { ...data },
        });
        toast.dismiss();
        toast.success("Updated Successfully.");
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        toast.error("Somethign went Wrong in updating!");
      });
  };

  useEffect(() => {
    setLoading(true);
    getProfileUser(username)
      .then((data) => {
        console.log(data.data);
        setProfileData(data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  console.log(profileData);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 p-4">
          <ProfileImageField profile_img={profile_img} />

          <form ref={formRef} onSubmit={handleSubmit}>
            <main>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10">
                <InputBox
                  type="text"
                  name="fullname"
                  icon="fi fi-rr-user"
                  value={fullname}
                  disabled={true}
                />

                <InputBox
                  type="email"
                  name="email"
                  icon="fi fi-rr-envelope"
                  value={email}
                  disabled={true}
                />
              </div>

              <InputBox
                type="text"
                name="username"
                icon="fi fi-rr-user"
                value={username}
              />

              <div className="bio-section">
                <label htmlFor="bio" className="block relative">
                  <i className="fi fi-rr-pen-nib text-dark-grey absolute bottom-4 right-4"></i>
                  <textarea
                    id="bio"
                    name="bio"
                    className="h-56 w-full p-4 placeholder:text-dark-grey input-box"
                    placeholder="Brief about your story..."
                    maxLength={200}
                    defaultValue={bio}
                  ></textarea>
                </label>
                <p className="text-dark-grey text-sm text-right my-2">
                  {bio.length}/200
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {profileData &&
                  Object.keys(profileData.social_links).map((key, index) => {
                    const link = profileData.social_links[key];

                    return (
                      <InputBox
                        key={index}
                        type="text"
                        name={key}
                        icon={
                          key !== "website"
                            ? `fi fi-brands-${key}`
                            : "fi fi-rr-globe"
                        }
                        value={link || ""}
                        placeholder={`https://www.${key}.com/username`}
                      />
                    );
                  })}
              </div>
            </main>

            <button className="btn-dark">Update Profile</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ProfileEditor;
