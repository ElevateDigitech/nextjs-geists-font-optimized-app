import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useSignupMutation } from '../store/api';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({ username, email, password }).unwrap();
      navigate('/login');
    } catch (err) {
      console.error('Failed to signup:', err);
    }
  };

  return (
    <div className="signup-container" style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="p-field" style={{ marginTop: 20 }}>
          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="p-field" style={{ marginTop: 20 }}>
          <label htmlFor="password">Password</label>
          <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} required />
        </div>
        {error && <p style={{ color: 'red' }}>Signup failed. Please try again.</p>}
        <Button type="submit" label={isLoading ? 'Signing up...' : 'Sign Up'} className="p-mt-3" disabled={isLoading} />
      </form>
    </div>
  );
};

export default SignupPage;
