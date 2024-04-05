import { Link } from 'react-router-dom';


export default function Blog(props) {
  const {userInfo} = props;
  return (
    <div key={userInfo.id}>
      <Link to={`/BlogDetail/${userInfo.id}`}>
        <h2>{userInfo.name}</h2>
      </Link>
      <h3>Email: {userInfo.website}</h3>
      <p>Company: {userInfo.company.name}</p>
      <hr />
    </div>
  );
}
