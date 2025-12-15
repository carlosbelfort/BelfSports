import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">BelfSports</h1>
      <p>Sistema acadêmico de eventos esportivos</p>

      <Link
        href="/login"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Acessar sistema
      </Link>
    </main>
  );
}
