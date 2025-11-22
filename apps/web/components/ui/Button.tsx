import { forwardRef } from 'react';

// TODO: Replace with a real Button component from a UI library like Material UI

export const Button = forwardRef<
  HTMLButtonElement,
  { loading: boolean; children: React.ReactNode;[key: string]: any }
>(function Button({ loading, children, ...props }, ref) {
  return (
    <button ref={ref} disabled={loading} {...props}>
      {loading && <div className="mr-2" aria-hidden />}
      {children}
    </button>
  );
});