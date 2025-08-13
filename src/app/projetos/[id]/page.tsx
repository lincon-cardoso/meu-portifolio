import { notFound } from "next/navigation";
import Link from "next/link";
import { Projeto } from "@/types/Projeto";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { slugify } from "@/utils/slugify";

async function fetchProjetoBySlugOrId(param: string): Promise<Projeto | null> {
  try {
    // Tenta primeiro por título slugificado
    const all = await prisma.projeto.findMany();
    const found = all.find(
      (p) =>
        slugify(p.titulo || "") === param ||
        p.id === param ||
        `${p.id}-${slugify(p.titulo || "")}` === param
    );
    if (!found) return null;
    return {
      ...found,
      link: found.link || undefined,
      linkGithub: found.linkGithub || undefined,
    } as unknown as Projeto;
  } catch {
    return null;
  }
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const projeto = await fetchProjetoBySlugOrId(id);
  if (!projeto) return { title: "Projeto não encontrado" };
  const baseTitle = projeto.titulo || "Projeto";
  const desc = projeto.descricao?.slice(0, 155) || "Projeto do portfólio";
  const slug = slugify(projeto.titulo || "");
  const canonicalPath = `/projetos/${slug}`;
  return {
    title: `${baseTitle} | Portfólio`,
    description: desc,
    openGraph: {
      title: baseTitle,
      description: desc,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: baseTitle,
      description: desc,
    },
    alternates: {
      canonical: canonicalPath,
    },
  };
}

export default async function ProjetoPage({ params }: Props) {
  const { id } = await params;
  const projeto = await fetchProjetoBySlugOrId(id);
  if (!projeto) return notFound();

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1rem" }}>
      <Link
        href="/"
        style={{ display: "inline-block", marginBottom: 16, color: "#1976d2" }}
      >
        &larr; Voltar
      </Link>
      <h1 style={{ fontSize: "2rem", marginBottom: 8 }}>{projeto.titulo}</h1>
      <p style={{ lineHeight: 1.5, marginBottom: 16 }}>{projeto.descricao}</p>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}
      >
        {projeto.tecnologias?.map((t) => (
          <span
            key={t}
            style={{
              background: "#1976d2",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: 16,
              fontSize: 12,
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0" }}>
        <li>
          <b>Categoria:</b> {projeto.category}
        </li>
        {projeto.link && (
          <li>
            <b>Link:</b>{" "}
            <a
              href={projeto.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1976d2" }}
            >
              {projeto.link}
            </a>
          </li>
        )}
        {projeto.linkGithub && (
          <li>
            <b>GitHub:</b>{" "}
            <a
              href={projeto.linkGithub}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1976d2" }}
            >
              {projeto.linkGithub}
            </a>
          </li>
        )}
        <li>
          <b>Destaque:</b> {projeto.destaque ? "Sim" : "Não"}
        </li>
      </ul>
    </main>
  );
}
