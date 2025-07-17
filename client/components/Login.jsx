import { useState } from 'react';
import { login } from '../services/authApi.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          minLength={1}
          maxLength={36}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={1}
          maxLength={36}
          required
        />
        <button>Login</button>
      </form>
    </>
  );
};

export { Login };
