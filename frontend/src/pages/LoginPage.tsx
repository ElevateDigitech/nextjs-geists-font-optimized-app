import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useLoginMutation } from '../store/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      // Save token to localStorage or context
      localStorage.setItem('token', result.token);
      navigate('/');
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="p-field" style={{ marginTop: 20 }}>
          <label htmlFor="password">Password</label>
          <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} required />
        </div>
        {error && <p style={{ color: 'red' }}>Login failed. Please check your credentials.</p>}
        <Button type="submit" label={isLoading ? 'Logging in...' : 'Login'} className="p-mt-3" disabled={isLoading} />
      </form>
    </div>
  );
};

export default LoginPage;
