import React, { useState } from 'react';

const ChatQueryForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const queryData = { name, email, category, query };
    
    try {
      const response = await fetch('http://localhost:5000/api/submit-query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryData),
      });
  
      const result = await response.json();
      if (result.status === 'success') {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setCategory('');
        setQuery('');
        setTimeout(() => {
          setIsOpen(false);
          setIsSubmitted(false);
        }, 3000);
      } else {
        console.log('Error submitting the query:', result.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  return (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Chat with us →
        </button>
      ) : (
        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '20rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Raise a Query</h2>
          {isSubmitted ? (
            <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '0.5rem', borderRadius: '0.25rem', marginBottom: '1rem' }}>
              Your query has been submitted successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
                required
              >
                <option value="">Select Query Category</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Booking Issue">Booking Issue</option>
                <option value="Class Availability">Class Availability</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
              <textarea
                placeholder="Describe your query (e.g., 'I have an issue with my recent booking...')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', minHeight: '5rem' }}
                required
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Submit
              </button>
            </form>
          )}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: '100%',
              backgroundColor: '#e5e7eb',
              color: '#4b5563',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatQueryForm;
