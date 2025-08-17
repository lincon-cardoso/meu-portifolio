"use client";
// ...existing code...
import React, { useEffect, useState } from "react";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description?: string;
  private: boolean;
}

interface RepoDropdownProps {
  repos: GitHubRepo[];
  // opcional: callback para notificar um outro client component
  onSelect?: (repo: GitHubRepo | null) => void;
}

export default function RepoDropdown({ repos, onSelect }: RepoDropdownProps) {
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  useEffect(() => {
    // tenta restaurar seleção anterior da sessão (opcional)
    try {
      const raw = sessionStorage.getItem("selectedRepo");
      if (raw) setSelectedRepo(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // salva seleção na sessionStorage (opcional)
    try {
      if (selectedRepo)
        sessionStorage.setItem("selectedRepo", JSON.stringify(selectedRepo));
      else sessionStorage.removeItem("selectedRepo");
    } catch {
      // ignore
    }

    if (onSelect) onSelect(selectedRepo ?? null);
  }, [selectedRepo, onSelect]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = Number(e.target.value);
    const repo = repos.find((r) => r.id === id) ?? null;
    setSelectedRepo(repo);
  }

  return (
    <div>
      <label htmlFor="repo-select">Escolha um repositório:</label>
      <select
        id="repo-select"
        onChange={handleChange}
        value={selectedRepo?.id ?? ""}
      >
        <option value="">-- nenhum --</option>
        {repos.map((repo) => (
          <option key={repo.id} value={repo.id}>
            {repo.name}
          </option>
        ))}
      </select>

      {selectedRepo ? (
        <div style={{ marginTop: 12 }}>
          <strong>Selecionado:</strong> {selectedRepo.name}
          <div>Descrição: {selectedRepo.description ?? "—"}</div>
          <div>
            URL:{" "}
            <a href={selectedRepo.html_url} target="_blank" rel="noreferrer">
              {selectedRepo.html_url}
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
// ...existing code...
