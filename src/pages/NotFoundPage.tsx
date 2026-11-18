import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link to="/" className="mt-4 inline-block text-sky-400 hover:underline">
        Back to the books
      </Link>
    </div>
  );
}
