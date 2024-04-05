import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Blog from './Blog';

export default function Index() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      const urlsToFetch = [
        "https://jsonplaceholder.typicode.com/users",
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/comments",
      ];

      const fetchURLs = async (urls) => {
        try {
          const promises = urls.map((url) => fetch(url));

          // Wait for all of the promises to resolve
          const responses = await Promise.all(promises);

          // Extract JSON data from responses
          const data = await Promise.all(
            responses.map((response) => response.json())
          );

          return data;
        } catch (error) {
          throw new Error(`Failed to fetch data: ${error}`);
        }
      };

      const data = await fetchURLs(urlsToFetch);
      console.log(data);
      const [users, posts, comments] = data;
      setUsers(users);
      setPosts(posts);
      setComments(comments);
    })();
  }, []);
  return (
    <div>
      This is the index
      {users.map((user, index) => {
        return (
          <Blog key={users[index].id} userInfo={users[index]} /* userPosts={posts.filter(post => post.userId === user.id)} *//>
        );
      })}
    </div>
  )
}
