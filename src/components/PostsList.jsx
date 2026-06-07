import { useState } from 'react';

export default function PostsList() {
  const Posty = [
    {
      id: 1,
      title: 'Pierwszy post',
      body: 'To jest treść pierwszego posta.',
    },
    {
      id: 2,
      title: 'Drugi post',
      body: 'To jest treść drugiego posta.',
    },
    {
      id: 3,
      title: 'Trzeci post',
      body: 'To jest treść trzeciego posta.',
    },
  ];

  const [posts, setPosts] = useState(Posty);
  const [error, setError] = useState(null);

  const handleDeletePost = (id) => {
    const originalPosts = posts;
    
  
    setPosts(posts.filter(post => post.id !== id));
    setError(null);

  
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Nie udało się usunąć posta');
        }
        console.log(`Post ${id} usunięty pomyślnie`);
      })
      .catch(error => {
        console.error('Błąd przy usuwaniu:', error);
        setPosts(originalPosts);
        setError(`Błąd: Nie udało się usunąć posta (ID: ${id})`);
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Lista postów</h2>
      
      {error && (
        <div
          style={{
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: '#ffcccc',
            border: '1px solid #cc0000',
            borderRadius: '4px',
            color: '#cc0000',
          }}
        >
          {error}
        </div>
      )}

      {posts.length === 0 ? (
        <p>Brak postów na liście.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map(post => (
            <li
              key={post.id}
              style={{
                padding: '15px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{post.title}</h3>
              <p style={{ marginBottom: '10px', color: '#666' }}>{post.body}</p>
              <button
                onClick={() => handleDeletePost(post.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
