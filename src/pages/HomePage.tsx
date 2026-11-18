import { useAuth } from '../context/useAuth';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold">Books</h1>
      <p className="mt-2 text-slate-300">
        {user ? `Welcome back, ${user.username}.` : 'You are browsing as a guest.'}
      </p>
      <p className="mt-4 text-slate-400">The books list arrives in Step F5.</p>
    </div>
  );
}
