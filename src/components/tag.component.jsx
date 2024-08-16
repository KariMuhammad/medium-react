import clsx from "clsx";

const Tag = ({ tag, loadData, pageState }) => {
  return (
    <button
      className={clsx({
        tag: true,
        "bg-black text-white": pageState === tag.toLowerCase(),
      })}
      onClick={loadData(tag)}
    >
      {tag}
    </button>
  );
};

export default Tag;
