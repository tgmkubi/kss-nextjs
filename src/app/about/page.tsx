import { authenticatedUser } from "@/utils/amplify-server-utils";
import { redirect } from "next/navigation";

export default async function AboutPage() {
    // Server-side authentication check
    const user = await authenticatedUser();

    if (!user) {
        redirect('/auth/login');
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        About Us
                    </h1>

                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 mb-4">
                            Welcome to our application! This is a protected page that only authenticated users can access.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                            <h3 className="text-lg font-medium text-blue-900 mb-2">
                                User Information
                            </h3>
                            <p className="text-blue-700">
                                <strong>Email:</strong> {user.username}
                            </p>
                            <p className="text-blue-700">
                                <strong>User ID:</strong> {user.userId}
                            </p>
                            <p className="text-blue-700">
                                <strong>Admin Status:</strong> {user.isAdmin ? 'Yes' : 'No'}
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We are dedicated to providing secure and user-friendly applications
                            that help our users achieve their goals efficiently.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Features
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Secure authentication with AWS Cognito</li>
                            <li>Role-based access control</li>
                            <li>Modern and responsive design</li>
                            <li>Server-side rendering for better performance</li>
                        </ul>
                    </div>

                    <div className="mt-8 flex space-x-4">
                        <a
                            href="/dashboard"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Go to Dashboard
                        </a>
                        <a
                            href="/"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}