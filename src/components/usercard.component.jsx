import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  const {
    personal_info: { fullname, username, profile_img, bio },
  } = user;

  console.log(bio);

  return (
    <Link to={`/user/${username}`} className="flex items-center gap-5 mb-5">
      <img src={profile_img} className="w-12 h-12 rounded-full" />

      <div className="">
        <h1 className="text-xl font-bold">{fullname}</h1>
        <p className="-mt-1 mb-4 text-sm text-dark-grey">@{username}</p>

        <p className="text-dark-grey line-clamp-2">{bio}</p>
      </div>
    </Link>
  );
};

export default UserCard;
