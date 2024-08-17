const LoadMoreButton = ({ pagination, fetchMoreFn }) => {
  if (!pagination.nextPage || pagination.nextPage > pagination.totalPages)
    return null;

  console.log(pagination);

  return (
    <div className="flex justify-center">
      <button
        className="bx-3 py-1 text-twitter"
        onClick={() => fetchMoreFn({ page: pagination.nextPage, append: true })}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;
