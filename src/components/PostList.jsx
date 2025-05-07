import { Link } from "react-router-dom";

import { useAsync } from "../hooks/useAsync";
import { getPosts } from "../services/posts";

export default function PostList() {
  const { loading, error, value: posts } = useAsync(getPosts);
  if (loading) return <h1>Posts are loading</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="bg-gray-600 w-fit h-fit m-5">
      {posts.map((post) => (
        <Link className="text-white ml-2 mr-2 text-xl" to={`/posts/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </div>
  );
}
