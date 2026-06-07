import { useState } from 'react';

export default function Post() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddPost = (title, body) => {
    setLoading(true);
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Odpowiedź z serwera:', data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Błąd:', error);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      handleAddPost(title, body);
      setTitle('');
      setBody('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Dodaj nowy post</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title">Tytuł: </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Wpisz tytuł"
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="body">Treść: </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Wpisz treść"
            style={{ width: '100%', padding: '5px', minHeight: '100px' }}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Wysyłanie...' : 'Dodaj post'}
        </button>
      </form>
    </div>
  );
}
