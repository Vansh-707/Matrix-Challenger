import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import '../styles/globals.css';

const NavigationBar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Comment App
          </Link>
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/comments" className={`nav-link ${router.pathname === '/comments' ? 'text-blue-600' : 'text-gray-600'}`}>
                  Comments
                </Link>
                <Link href="/notifications" className={`nav-link ${router.pathname === '/notifications' ? 'text-blue-600' : 'text-gray-600'}`}>
                  Notifications
                </Link>
                <span className="text-gray-600 nav-link">{user?.email}</span>
                <button onClick={logout} className="nav-link text-red-600 hover:text-red-700">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className={`nav-link ${router.pathname === '/login' ? 'text-blue-600' : 'text-gray-600'}`}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isProtectedRoute = ['/comments', '/notifications'].includes(router.pathname);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <NavigationBar />
        <main className="container mx-auto px-4 py-8">
          {isProtectedRoute ? (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          ) : (
            <Component {...pageProps} />
          )}
        </main>
      </div>
    </AuthProvider>
  );
}

export default MyApp;