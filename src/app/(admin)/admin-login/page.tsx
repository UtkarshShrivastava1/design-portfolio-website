"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Lock, AlertCircle } from 'lucide-react';

export default function Page() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

// interface AdminLoginInputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: AdminLoginFormData) => ({
        ...prev,
        [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
};

interface AdminLoginFormData {
    email: string;
    password: string;
}

interface AdminLoginResponse {
    message?: string;
    [key: string]: unknown;
}

const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        const response = await fetch('/api/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });
        
        const data: AdminLoginResponse = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        router.push('/admin/dashboard');
        
        // Handle successful login
        // console.log('Login successful:', data);
        
        // Redirect to admin dashboard
        
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
          setError(message);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="min-h-screen pt-20 bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-400">
            <User className="text-yellow-400 w-8 h-8 " />
          </div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Admin Login</h1>
          <p className="text-gray-600">Enter your credentials to access the admin panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-200">
          <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pl-10 text-black border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-0 transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="admin@example.com"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pl-10 pr-12 text-black border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:ring-0 transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-black text-yellow-400 py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-yellow-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Secure admin access only
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}