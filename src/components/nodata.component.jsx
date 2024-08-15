const NoDataMessage = ({ message }) => {
  return (
    <div className="bg-grey rounded-full">
      <h4 className="p-4 text-center text-xl">{message}</h4>
    </div>
  );
};

export default NoDataMessage;
