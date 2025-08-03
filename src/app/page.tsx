import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Our App
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            This is a public page that everyone can access. 
            Sign in to access protected features and content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Public Content
            </h3>
            <p className="text-gray-600">
              This content is available to everyone, no authentication required.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Protected Features
            </h3>
            <p className="text-gray-600 mb-4">
              Sign in to access your dashboard, profile, and other protected features.
            </p>
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View About Page (Protected) →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              Powered by AWS Cognito for secure user management and authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}