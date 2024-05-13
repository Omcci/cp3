import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-5">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg sm:text-2xl font-bold">Checkpoint : Frontend</h1>
        <Link href="/">
          Countries

        </Link>
      </div>
    </header>
  );
}
