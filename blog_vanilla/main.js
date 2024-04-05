import "./style.css";
import viteLogo from "/vite.svg";

const blogListButton = document.querySelector('.clickable')
blogListButton.addEventListener('click', () => {
  blogList.classList.toggle("hide");
})

const blogList = document.querySelector("#blogList");
const blogInfo = document.querySelector("#blogInfo");
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

users.forEach((user) => {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user");
  userInfo.innerHTML = `
          <p>UserId: ${user.id}</p>
          <p>Name: ${user.name}</p>
          <p>Website: ${user.website}</p>
          <p>Company: ${user.company.name}</p>
        <hr />
    `;
  blogList.append(userInfo);
  
  userInfo.addEventListener("click", () => {
    blogList.classList.toggle('hide')
    blogInfo.innerHTML = `<h1>${user.name}'s Posts</h1>`;
    const userPosts = posts.filter((post) => post.userId === user.id);
    console.log(user.id, userPosts);

    userPosts.forEach((userPost) => {
      const post = document.createElement("div");
      post.classList.add("post");
      post.innerHTML = `
        <h2>Post #${userPost.id} ${userPost.title}</h2>
        <p>${userPost.body}</p>
      `;
      blogInfo.append(post);

      const commentsButton = document.createElement("button");
      commentsButton.textContent = 'Show Comments'
      post.append(commentsButton);

      const postComments = document.createElement("div");
      postComments.classList.add("comments", "hide");
      post.append(postComments)

      post.insertAdjacentHTML('beforeend', '<hr />')

      const userComments = comments.filter(
        (comment) => comment.postId === userPost.id
      );
      userComments.forEach((userComment) => {
        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.innerHTML = `
            <h3>Comment #${userComment.id}</h3>
            <h4>${userComment.name}</h4>
            <p>${userComment.body}</p>
          `;
        postComments.append(comment);
      });

      let hiding = true
      commentsButton.addEventListener("click", () => {
        hiding = !hiding
        postComments.classList.toggle('hide')
        commentsButton.textContent = hiding ? 'Show Comments' : 'Hide Comments'
      });
    });
  });
});
