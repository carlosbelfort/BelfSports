import Link from 'next/link'

type Props = {
  title: string
  href: string
}

export function AdminCard({ title, href }: Props) {
  return (
    <Link
      href={href}
      className="bg-zinc-900 hover:bg-zinc-800 transition p-6 rounded-xl border border-zinc-800"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-zinc-400 mt-2">
        Gerenciar {title.toLowerCase()}
      </p>
    </Link>
  )
}
