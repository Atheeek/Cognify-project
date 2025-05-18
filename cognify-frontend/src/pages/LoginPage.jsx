import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth'; // Remove Firebase import
// import { auth } from '../firebase'; // Remove Firebase import

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const response = await fetch('http://localhost:5000/api/users/login', { // Replace with your backend login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Store authentication token or user info in local storage/state
      localStorage.setItem('authToken', data.token); // Example: storing a JWT token
      navigate('/home');

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 font-sans">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login to Cognify</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="p-3 border rounded" required />
          <input type="password" placeholder="Password" className="p-3 border rounded" required />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Login</button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;