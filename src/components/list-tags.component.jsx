import Tag from "./tag.component";

const ListTags = ({ tags, loadData, pageState }) => {
  return (
    <>
      {tags.map((tag, index) => (
        <Tag key={index} tag={tag} loadData={loadData} pageState={pageState} />
      ))}
    </>
  );
};

export default ListTags;
