import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center p-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">Yisu Kim</h1>
      </Link>
    </header>
  );
}
