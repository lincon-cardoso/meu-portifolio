import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutButton from "../../components/dashboard/SignOutButton";
import styles from "./dashboard.module.scss";
import RepoDropdown from "@/app/dashboard/components/RepoDropdown";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description?: string;
  private: boolean;
}

async function fetchGitHubRepos(username: string) {
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
  const headers: Record<string, string> = {};

  // Usa token se existir (coloque em .env.local)
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers, next: { revalidate: 60 } });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`GitHub API error: ${response.status} ${text}`);
  }
  return (await response.json()) as GitHubRepo[];
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Prefira usar process.env.GITHUB_USERNAME para não hardcodear
  const githubUsername = process.env.GITHUB_USERNAME || "lincon-cardoso";
  let repos: GitHubRepo[] = [];
  let errorMessage = "";

  try {
    repos = await fetchGitHubRepos(githubUsername);
  } catch (error: unknown) {
    console.error("Erro ao buscar repositórios:", error);
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "Erro desconhecido ao buscar repositórios";
    }
  }

  return (
    <main className={styles.dashboard}>
      <h1 className={styles["dashboard__title"]}>Dashboard</h1>
      <p className={styles["dashboard__welcome"]}>
        Bem-vindo, {session.user?.name || session.user?.email}
      </p>
      <h2 className={styles["dashboard__projects-title"]}>Lista de Projetos</h2>
      {errorMessage ? (
        <div className={styles["dashboard__error"]}>
          Erro ao carregar repositórios: {errorMessage}
        </div>
      ) : null}
      <RepoDropdown repos={repos} />
      
      {/* botao sair */}
      <SignOutButton className={styles["dashboard__signout-btn"]} />
    </main>
  );
}
