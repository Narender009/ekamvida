import React, { useEffect, useState } from 'react';
import './Blog.css';
import Navbar from './Navbar';
import Header from './Header';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // Number of posts per page

  useEffect(() => {
    fetch('http://localhost:5000/api/posts/')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date_posted);
    const dateB = new Date(b.date_posted);
    if (dateA.toDateString() === dateB.toDateString()) {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else {
      return dateB - dateA;
    }
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatePosts = (posts) => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  };

  const displayPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; // Number of page numbers to show at a time

    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if end page is less than max pages to show
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Add page numbers to array
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipses for skipped pages
    if (startPage > 1) {
      pageNumbers.unshift('...');
      pageNumbers.unshift(1);
    }
    if (endPage < totalPages) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const paginatedPosts = paginatePosts(sortedPosts);

  return (
    <div>
      <Navbar />

      <div className="container-j">
        <header className='header-j'>
          <h1>Explore our guided content on all things yoga and wellness</h1>
          <div className='nav-j'>
            <ul className='ul1'>
              {displayPageNumbers().map((number, index) => (
                <li key={index} onClick={() => handlePageChange(number)} className={number === currentPage ? 'active' : ''}>
                  {number === '...' ? '...' : number}
                </li>
              ))}
              {currentPage < totalPages && (
                <li onClick={() => handlePageChange(currentPage + 1)}>
                  <button className="next-page-button">Next page <img src='images/arrow-right.svg'/></button>
                </li>
              )}
            </ul>
          </div>
        </header>

        <main className='main-j'>
          {paginatedPosts.length > 0 && (
            <div>
              {(() => {
                const lastPost = paginatedPosts.find((post, index) =>
                  index === paginatedPosts.length - 1 || post.date_posted !== paginatedPosts[index + 1].date_posted
                );
                return lastPost ? (
                  <div key={lastPost.id} className="single-post-container">
                    <div className="post-item">
                      <div className="image-container-j">
                        <img src={`http://localhost:5000${lastPost.image_url}`} alt={lastPost.title} />
                      </div>
                      <article className='article'>
                        <h3 className="date-header">{formatDate(lastPost.date_posted)}</h3>
                        <h2>{lastPost.title}</h2>
                        <p>{lastPost.content}</p>
                        <p className="author-first">{lastPost.author}</p>
                      </article>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </main>
      </div>

      <div className="container-c">
        <div className="grid-c">
          {paginatedPosts.map(post => (
            <article className="card" key={post.id}>
              <img src={`http://localhost:5000${post.image_url}`} alt={post.title} style={{ width: '380px', height: '200px' }} />
              <div className="content">
                <p className="date">{formatDate(post.date_posted)}</p>
                <h2>{post.title}</h2>
                <p className="excerpt">{post.content.substring(0, 100)}...</p>
                <p className="author">{post.author}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="pagination">
          <ul>
            {displayPageNumbers().map((number, index) => (
              <li key={index} onClick={() => handlePageChange(number)} className={number === currentPage ? 'active' : ''}>
                {number === '...' ? '...' : number}
              </li>
            ))}
            {currentPage < totalPages && (
              <li onClick={() => handlePageChange(currentPage + 1)}>
                <button className="next-page-button">Next page<img src='images/arrow-right.svg' alt="arrow" /></button>
              </li>
            )}
          </ul>
        </div>
      </div>
     < Header />
    </div>
  );
};

export default Blog;
