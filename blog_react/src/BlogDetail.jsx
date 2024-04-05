import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Post from "./Post";

export default function BlogDetail() {
  const { id } = useParams();
  const [posts, setPosts] = useState([])
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      const data = await response.json();
      console.log(data);
      setPosts(data);
    })();
  }, [])
  return (
    <>
      {posts ? 
        <>
        {posts.map((post, index) => <Post key={post.id} postDetail={posts[index]}/>)}
        </> : <h2>loading...</h2>
      }
    </>
  )
}
