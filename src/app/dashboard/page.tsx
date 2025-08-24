import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "../../components/dashboard/SignOutButton";
import ProjectList from "./ProjectList";
import styles from "./dashboard.module.scss";

// Função para buscar projetos da API (server-side fetch precisa de URL absoluta)
async function getProjetos() {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    if (process.env.VERCEL_URL) {
      // Vercel define apenas o domínio, sem protocolo
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else {
      baseUrl = "http://localhost:3000";
    }
  }
  const res = await fetch(`${baseUrl}/api/projetos?all=true`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const projetos = await getProjetos();

  return (
    <main className={styles.dashboard}>
      <h1 className={styles["dashboard__title"]}>Dashboard</h1>
      <p className={styles["dashboard__welcome"]}>
        Bem-vindo, {session.user?.name || session.user?.email}
      </p>
      <h2 className={styles["dashboard__projects-title"]}>Lista de Projetos</h2>
      <ProjectList projetos={projetos} />

      <SignOutButton className={styles["dashboard__signout-btn"]} />
      <Link href="/" className={styles["dashboard__back-btn"]}>
        Voltar
      </Link>
    </main>
  );
}
