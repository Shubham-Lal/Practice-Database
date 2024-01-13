import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Provider';
import { DateTime } from 'luxon';

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
  const { posts, setPosts } = useContext(Context);

  const fetchPosts = async () => {
    const CustomHeader = new Headers();
    CustomHeader.append('Content-Type', 'application/json');
    const config = {
      method: 'GET',
      headers: CustomHeader,
    }
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fetch-posts`, config)
      .then(response => response.json())
      .then(result => {
        if (result.success === true) {
          setPosts(result.posts);
        }
        if (result.success === false) {
          alert(result.msg);
        }
      })
      .catch(err => alert(err));
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div id='show_posts'>
      {posts.map((post, id) => {

        const formattedTimeAgo = (createdAt) => {
          const createdDate = DateTime.fromISO(createdAt);
          const now = DateTime.now();
          const diff = now.diff(createdDate);
          if (diff.as('days') >= 1) {
            return `${Math.floor(diff.as('days'))} days ago`;
          } else if (diff.as('hours') >= 1) {
            return `${Math.floor(diff.as('hours'))} hours ago`;
          } else if (diff.as('minutes') >= 1) {
            return `${Math.floor(diff.as('minutes'))} minutes ago`;
          } else {
            return `${Math.floor(diff.as('seconds'))} seconds ago`;
          }
        };

        return (
          <div className='post' key={post._id}>
            <div className='post__header'>
              <p>{post.user.name}</p>
              <p>{formattedTimeAgo(post.createdAt)}</p>
            </div>
            <p>{post.text}</p>
          </div>
        )
      })}
    </div>
  )
}

const CreatePost = () => {
  const { user, posts, setPosts } = useContext(Context);
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
          setPosts([result.post, ...posts]);
          setText("");
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