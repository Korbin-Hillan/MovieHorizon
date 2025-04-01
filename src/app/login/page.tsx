"use client"; // Ensure this is a client component

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-gray-900 text-2xl font-bold mb-4">Login</h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}
