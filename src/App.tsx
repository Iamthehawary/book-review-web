import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [status, setStatus] = useState("Checking the API...");

  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((books: unknown[]) =>
        setStatus(`API reachable. Books in the database: ${books.length}`),
      )
      .catch((err) => setStatus(`API not reachable: ${err.message}`));
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
