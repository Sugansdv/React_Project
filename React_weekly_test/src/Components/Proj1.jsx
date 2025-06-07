import React, { useEffect, useState } from 'react'; 
import useLocalStorage from '../Hooks/useLocalStorage';
import { useTheme } from '../Contexts/ThemeContext'; 
import '../App.css';


export default function Proj1() {
  const [posts, setPosts] = useLocalStorage('blog-posts', [
      {
    title: "Welcome to My Blog!",
    content:
      "This is the first post on my new personal blog. Stay tuned for tips, stories, and updates.",
  },
  {
    title: "Getting Started with React",
    content:
      "React makes building interactive UIs easy and fun. In this blog, I'll share simple guides and projects to help you learn React step-by-step.",
  },
  ]);

  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const { theme, toggleTheme } = useTheme(); 
  useEffect(() => {
    document.title =
      posts.length > 0
        ? `${posts[posts.length - 1].title} - Personal Blog`
        : 'Personal Blog';
  }, [posts]);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      setPosts([...posts, { title, content }]);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className={`blog-container ${theme}`}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Project 1: Personal Blog Website</h1>
          <button
            className="btn btn-outline-primary theme-toggle-btn"
            onClick={toggleTheme}
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
        </div>

        <form onSubmit={handleAddPost} className="mb-5 blog-form">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add Post
          </button>
        </form>

        <div>
          {posts.length === 0 && <p>No posts yet. Add one above!</p>}
          {posts.map((post, idx) => (
            <div key={idx} className="card mb-3 blog-card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
