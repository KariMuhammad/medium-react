import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import toast from "react-hot-toast";
import InPageNavigation from "../components/inpage-navigation.component";
import PublishedBlogs from "../components/published-blogs.component";
import DraftBlogs from "../components/draft-blogs.component";

export let fetchBlogs;

const BlogManagement = () => {
  const query = useSearchParams();
  const tab = query[0].get("tab") || "published";
  console.log(tab);

  const {
    user: { token },
  } = useAuth();
  const [blogs, setBlogs] = useState(null);
  const [drafts, setDrafts] = useState(null);
  const [draftMode, setDraftMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  fetchBlogs = async ({ page = 1, mode = draftMode, search = searchQuery }) => {
    try {
      return fetch(
        `${
          import.meta.env.VITE_SERVER_DOMAIN
        }/blogs/dashboard?page=${page}&draft=${mode}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const debounceId = setTimeout(() => {
      if (token) {
        fetchBlogs({ page: 1 })
          .then(async (response) => {
            const data = await response.json();
            if (draftMode) {
              setDrafts(data.blogs);
            } else {
              setBlogs(data.blogs);
            }

            console.log("data", data);
            toast.success("Blogs fetched successfully");
          })
          .catch((e) => {
            toast.error("Failed to fetch blogs");
          });

        fetchBlogs({ page: 1, mode: !draftMode })
          .then(async (response) => {
            const data = await response.json();
            if (!draftMode) {
              setDrafts(data.blogs);
            } else {
              setBlogs(data.blogs);
            }

            console.log("data", data);
            toast.success("Blogs fetched successfully");
          })
          .catch((e) => {
            toast.error("Failed to fetch blogs");
          });
      }
    }, 1000);

    return () => {
      clearTimeout(debounceId);
    };
  }, [token, draftMode, searchQuery]);

  console.log("Drafts", drafts);

  return (
    <>
      <h1 className="max-md:hidden text-2xl">Blog Management</h1>

      <div className="w-full relative">
        <input
          type="text"
          placeholder="Search Blogs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-6 border border-gray-300 p-2 rounded-md"
        />

        <i className="fi fi-rr-search absolute right-[10%] top-1/2 -translate-y-1/2 md:left-5 w-fit md:pointer-events-none"></i>
      </div>

      <InPageNavigation
        headings={["Published blogs", "Drafts"]}
        hiddens={[]}
        defaultActive={tab !== "draft" ? 0 : 1}
      >
        <PublishedBlogs blogs={blogs} setData={setBlogs} />
        <DraftBlogs drafts={drafts} setData={setDrafts} />
      </InPageNavigation>
    </>
  );
};

export default BlogManagement;
