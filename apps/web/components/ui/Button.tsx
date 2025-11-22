// TODO: Replace with a real Button component from a UI library like Material UI

export function Button({ loading, children, ...props }: {loading: boolean, children: React.ReactNode}) {
  return (
    <button disabled={loading} {...props}>
      {loading && <div className="mr-2" aria-hidden />}
      {children}
    </button>
  );
}