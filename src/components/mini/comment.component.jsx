const Comment = ({ count, onClick }) => {
  return (
    <button className="btn-light py-2 px-4">
      <i className="fi fi-rr-comment mr-3"></i>
      {count}
    </button>
  );
};

export default Comment;
