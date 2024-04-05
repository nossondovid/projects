import React, { useState } from "react";
import "./Post.css";

export default function Post(props) {
  const [comments, setComments] = useState();
  const [hide, setHide] = useState(true);
  const { postDetail } = props;

  const onButtonClick = async () => {
    if (!comments) {
      console.log(`button ${postDetail.id} clicked`);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postDetail.id}`
      );
      const data = await response.json();
      console.log(data);
      setComments(data);
    }
    setHide(!hide);
  };
  return (
    <div>
      <h2>
        Post {postDetail.id}. {postDetail.title}
      </h2>
      <p>{postDetail.body}</p>
      <button onClick={() => onButtonClick()}>Show comments</button>
      {comments && (
        <>
          {comments.map((comment) => {
            return (
              <div key={comment.id} className={hide ? 'hidden' : ''} style={{fontSize: '0.75rem'}}>
                <h2>Comment {comment.id}</h2>
                <h3>Email: {comment.email}</h3>
                <p>{comment.body}</p>
              </div>
            );
          })}
        </>
      )}
      <hr />
    </div>
  );
}
