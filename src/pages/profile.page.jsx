import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfileUser } from "../services/users-endpoints";
import AnimationWrapper from "../common/page-animation";
import date from "date-and-time";
import ListBlogs from "../components/list-blogs.component";
import { getBlogsOfUser } from "../services/blog-endpoints";

const UserStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
  },

  account_info: {
    total_blogs: 0,
    total_reads: 0,
  },

  social_links: {},
};

const UserProfile = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState();
  const [data, setData] = useState(null);

  const fetchBlogs =
    (user_id) =>
    ({ page, append = false }) => {
      console.log("page", page);
      getBlogsOfUser({ user_id, page }).then((data) => {
        setData((prev) => {
          const _data = data.blogs;
          if (append) {
            return {
              ...prev,
              blogs: [...prev.blogs, ..._data.blogs],
              pagination: _data.pagination,
            };
          } else return _data;
        });
      });
    };

  useEffect(() => {
    console.log("ONCE");
    getProfileUser(userId).then((data) => {
      setProfileData(data.data[0]);
      fetchBlogs(data.data[0].id)({ page: 1 });
    });
  }, [userId]);

  const {
    personal_info: { fullname, username, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
    // blogs,
  } = profileData || UserStructure;

  return (
    <AnimationWrapper>
      <section className="md:flex md:flex-row md:gap-16">
        <div className="blogs-content w-full">
          <h2 className="text-center md:text-left">Blogs</h2>
          <div className="blogs">
            {data && data.blogs && (
              <ListBlogs
                blogs={data.blogs}
                pagination={data.pagination}
                fetchMore={fetchBlogs}
                user_id={profileData?.id}
              />
            )}
          </div>
        </div>
        <div className="user-info min-w-[40%] md:max-w-[250px] flex flex-col text-center md:block md:text-left">
          <div className="user-info__header">
            <div className="user-info__avatar bg-grey w-32 h-32 mx-auto md:m-0.5 rounded-full overflow-hidden">
              <img src={profile_img} alt="User Avatar" className="w-full" />
            </div>
            <div className="user-info__name">
              <h4 className="text-3xl font-bold capitalize">{fullname}</h4>
              <p>@{username}</p>
            </div>
          </div>
          <div className="user-info__stats flex gap-4 justify-center text-dark-grey my-7">
            <div className="user-info__stat">
              <h4>{total_posts?.toLocaleString()} - Blogs</h4>
            </div>
            <div className="user-info__stat">
              <h4>{total_reads?.toLocaleString()} - Reads</h4>
            </div>
          </div>

          <div className="user-info_bio">
            <h3>Bio</h3>
            <p className="text-center md:text-left line-clamp-3">{bio}</p>
          </div>

          <div className="user-info__social">
            <h3>Social Links</h3>
            <div className="links leading-10 flex gap-4 justify-center">
              {social_links &&
                Object.keys(social_links).map(
                  (key) =>
                    social_links[key] && (
                      <Link key={key} to={social_links[key]}>
                        <i
                          className={`fi fi-brands-${key} text-2xl hover:text-black`}
                        ></i>
                      </Link>
                    )
                )}
            </div>
          </div>

          <div className="user-info_joined-at">
            <h4 className="text-2xl font-medium">Joined At</h4>
            <p className="text-dark-grey">
              {date.format(new Date(joinedAt), "DD[th] MMMM, YYYY")}
            </p>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default UserProfile;
