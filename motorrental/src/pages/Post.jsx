import PostItem from "../components/PostItem";
import PrimaryTitle from "../components/PrimaryTitle";
import SubTitle from "../components/SubTitle";

const Post = ({ postData }) => {
  return (
    <>
      <section className="mt-25 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center py-20 mt-20 shadow-b">
          <PrimaryTitle title="Renters Post" />
          <SubTitle subTitle="See our latest renters Post" />
        </div>
        <div className="grid md:grid-cols-2 gap-6 justify-center mt-10">
          {postData.map((post) => (
            <PostItem post={post} key={post.id || post.title} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Post;
