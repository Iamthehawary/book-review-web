import { useEffect, useState } from 'react';
import { getBooks } from './api/books';
import { getErrorMessage } from './api/errors';

function App() {
  const [status, setStatus] = useState('Checking the API...');

  useEffect(() => {
    getBooks()
      .then((books) => setStatus(`API reachable. Books in the database: ${books.length}`))
      .catch((error) => setStatus(getErrorMessage(error)));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <div className="rounded-xl bg-slate-800 p-8 shadow-lg">
        <h1 className="text-3xl font-bold">Book Review</h1>
        <p className="mt-2 text-slate-300">{status}</p>
      </div>
    </main>
  );
}

export default App;
