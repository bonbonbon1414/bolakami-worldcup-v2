export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-16 w-16 text-primary"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m4.9 4.9 14.2 14.2" />
        <path d="M12 7v.01M9 10l3 3 3-3" />
      </svg>
      <h1 className="mt-4 text-3xl font-extrabold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-muted">
        Sepertinya bola tendang ini salah arah.
      </p>
    </div>
  );
}
