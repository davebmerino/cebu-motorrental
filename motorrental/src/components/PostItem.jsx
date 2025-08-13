import PrimaryTitle from "./PrimaryTitle";

const PostItem = ({ post }) => {
  return (
    <>
      <div className="p-4">
        <div className="md:bg-white shadow-md hover:shadow-lg transition rounded-xl overflow-hidden flex flex-col items-center text-center h-full hover:cursor-pointer">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="p-4">
            <PrimaryTitle title={post.title} />
            <hr className="my-5" />
            <p className="text-lg font-medium">{post.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItem;
