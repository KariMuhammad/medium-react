import date from "date-and-time";
import { Link } from "react-router-dom";

const AboutUser = ({ bio, social_links, joinedAt, isHide = true }) => {
  return (
    <div className={`${isHide ? "max-md:hidden" : ""}`}>
      <div className="user-info_bio mb-5">
        <h3>Bio</h3>
        <p className="text-center md:text-left line-clamp-3">{bio}</p>
      </div>

      {social_links.length > 0 && (
        <div className="user-info__social">
          <h3>Social Links</h3>
          <div className="links leading-10 flex gap-4 justify-center">
            {Object.keys(social_links).map(
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
      )}

      <div className="user-info_joined-at">
        <h4 className="text-2xl font-medium">Joined At</h4>
        <p className="text-dark-grey">
          {date.format(new Date(joinedAt), "DD[th] MMMM, YYYY")}
        </p>
      </div>
    </div>
  );
};

export default AboutUser;
