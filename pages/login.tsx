import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from './contexts/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm extends LoginForm {
  confirmPassword: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/comments');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return false;
    }
    if (!isLogin && form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const { data } = await axios.post(endpoint, {
        email: form.email,
        password: form.password
      });

      login(data.accessToken);
      router.push('/comments');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="input"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              className="input"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleInputChange}
                className="input"
                placeholder="Confirm your password"
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : (
              isLogin ? 'Login' : 'Register'
            )}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setForm({
                  email: '',
                  password: '',
                  confirmPassword: ''
                });
              }}
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;