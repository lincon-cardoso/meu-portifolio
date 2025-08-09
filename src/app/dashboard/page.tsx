import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {session.user?.name || session.user?.email}!</p>
      <p>Você está autenticado e pode acessar os recursos do dashboard.</p>
      <SignOutButton />
    </main>
  );
}
