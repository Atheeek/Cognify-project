import { useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth'; // Remove Firebase import
// import { auth } from '../firebase'; // Remove Firebase import
import { useState } from "react";

function SignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', { // Replace with your backend signup endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      console.log('Signup successful:', data);
      localStorage.setItem('authToken', data.token); // Example: storing a JWT token
      navigate('/home');

    } catch (error) {
      setError(error.message);
      alert(error.message); // You might want to display this error in the component's UI instead of an alert
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 font-sans">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Create Your Cognify Account</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input type="text" placeholder="Name" className="p-3 border rounded" required />
          <input type="email" placeholder="Email" className="p-3 border rounded" required />
          <input type="password" placeholder="Password" className="p-3 border rounded" required />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Sign Up</button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a> {/* Corrected link to /login */}
        </p>
      </div>
    </div>
  );
}

export default SignupPage;