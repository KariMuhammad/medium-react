import { Link } from "react-router-dom";
import notFoundImage from "../imgs/404.png";
import fulllogo from "../imgs/full-logo.png";

const NotFoundPage = () => {
  return (
    <section className="h-cover flex flex-col gap-20 items-center text-center">
      <img
        src={notFoundImage}
        className="w-72 border-2 border-grey rounded object-cover"
      />

      <h1 className="text-4xl font-bold text-gelasio">Not Found Page!</h1>
      <p className="text-dark-grey -mt-10">
        the page you looking for doesn't exist!{" "}
        <Link to="/" className="text-twitter underline">
          go back home
        </Link>
      </p>

      <div className="my-auto">
        <img src={fulllogo} className="h-14 mx-auto object-contain" />

        <p className="text-dark-grey text-lg">
          Explore Millions of articles and stories from around the world
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;
