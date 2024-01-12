import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Provider'

const Home = () => {
  const { user } = useContext(Context);

  return (
    <div className='home'>
      <Navbar />
      <div className='container'>
        {user._id && <CreatePost />}
        <ShowPosts />
      </div>
    </div>
  )
}

const ShowPosts = () => {
  return (
    <div id='show_posts'>

    </div>
  )
}

const CreatePost = () => {
  const { user } = useContext(Context);
  const [text, setText] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const postData = { text, user: user._id };

    const CustomHeader = new Headers();
    CustomHeader.append('Content-Type', 'application/json');
    CustomHeader.append("Authorization", localStorage.getItem("token"));
    const config = {
      method: 'POST',
      headers: CustomHeader,
      body: JSON.stringify(postData)
    }
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create-post`, config)
      .then(response => response.json())
      .then(result => {
        if (result.success === true) {
          setText("");
          alert(result.msg);
        }
        if (result.success === false) {
          alert(result.msg);
        }
      })
      .catch(err => alert(err));
  };

  return (
    <form id='create__post' onSubmit={handleCreatePost}>
      <textarea
        type="text"
        placeholder="What's on your mind?"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button>Post</button>
    </form>
  )
}

const Navbar = () => {
  const { user, setUser } = useContext(Context);

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('token');
  };

  return (
    <div className='navbar__container'>
      <p>Share</p>
      {user._id ? (
        <div className='auth__button' onClick={handleLogout}>
          Logout
        </div>
      ) : (
        <Link className='auth__button' to='/auth'>
          Signin
        </Link>
      )}
    </div>
  )
}

export default Home