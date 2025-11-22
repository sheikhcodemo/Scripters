// TODO: Replace with a real Alert component from a UI library like Material UI

import { Button } from './Button';

function Alert({ children, ...props }: { children: React.ReactNode, severity: string, role: string }) {
  return <div {...props}>{children}</div>;
}

function AlertTitle({ children, ...props }: { children: React.ReactNode }) {
  return <h3 {...props}>{children}</h3>;
}

export function ErrorAlert({ title, message, action }: { title: string, message: string, action?: { label: string, onClick: () => void } }) {
  return (
    <Alert severity="error" role="alert">
      <AlertTitle>{title}</AlertTitle>
      <p>{message}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-2" loading={false}>
          {action.label}
        </Button>
      )}
    </Alert>
  );
}