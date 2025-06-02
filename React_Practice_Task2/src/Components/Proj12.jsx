import React, { useEffect, useState } from "react";
import '../assets/Css/NewsApp.css';

function Proj12() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://gnews.io/api/v4/top-headlines?lang=en&country=us&apikey=9a59772e2d0fd2ec8788816e49a7b600`)
      .then(res => res.json())
      .then(data => {
        if (data.articles) {
          setArticles(data.articles);
          setError('');
        } else {
          setError(data.message || 'Failed to fetch news');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch news');
        setLoading(false);
      });
  }, []);

  return (
    <div className="news-container">
      <h1 className="title">Latest News Headlines</h1>

      {loading && <p className="loading">Loading news...</p>}
      {error && <p className="error">{error}</p>}

      <div className="news-list">
        {articles.map((article, idx) => (
          <div key={idx} className="news-card">
            {article.image && (
              <img src={article.image} alt={article.title} className="news-image" />
            )}
            <div className="news-content">
              <h3 className="news-title">{article.title}</h3>
              <p className="news-description">{article.description}</p>
              <a href={article.url} target="_blank" rel="noreferrer" className="read-more">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Proj12;
