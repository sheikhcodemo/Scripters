// TODO: Replace with a real LoginForm component from a UI library like Material UI

'use client'
import { useState } from 'react';
import { Button } from './Button';

export function LoginForm() {
  const [error, setError] = useState('');
  const handleSubmit = () => {}

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <span id="email-error" role="alert" className="text-red-500">
          {error}
        </span>
      )}
      <Button type="submit" loading={false}>Sign In</Button>
    </form>
  );
}