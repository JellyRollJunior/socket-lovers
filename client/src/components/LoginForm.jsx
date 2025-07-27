import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { login } from '../services/authApi.js';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useContext(ToastContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <form
      className="max-w-2xs mt-12 flex w-full flex-col"
      onSubmit={handleLogin}
    >
      <input
        className="border-1 mt-1 h-11 w-full rounded-md border-gray-400 bg-gray-200 pl-1.5"
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        minLength={1}
        maxLength={36}
        placeholder="Username"
        required
      />
      <input
        className="border-1 mt-3 h-11 w-full rounded-md border-gray-400 bg-gray-200 pl-1.5"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength={1}
        maxLength={36}
        placeholder="Password"
        required
      />
      <div className="mt-8">
        <button className="w-full rounded-xl bg-blue-400 px-5 py-2 text-white hover:bg-blue-500">
          Log In
        </button>
      </div>
    </form>
  );
};

export { LoginForm };
