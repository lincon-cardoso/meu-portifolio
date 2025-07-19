/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";

// Mock do SCSS
jest.mock("@/style/pages/dashboard/dashboard.scss", () => ({}));

describe("Dashboard Page", () => {
  it("renders dashboard title", async () => {
    render(<DashboardPage />);

    const title = screen.getByText("Dashboard");
    expect(title).toBeInTheDocument();
  });

  it("renders dashboard subtitle", async () => {
    render(<DashboardPage />);

    const subtitle = screen.getByText(
      "Gerencie seus projetos e deploys automatizados"
    );
    expect(subtitle).toBeInTheDocument();
  });

  it("shows loading state initially", async () => {
    render(<DashboardPage />);

    const loadingText = screen.getByText("Carregando projetos...");
    expect(loadingText).toBeInTheDocument();
  });

  it("loads and displays mock projects after loading", async () => {
    render(<DashboardPage />);

    // Wait for loading to finish
    await waitFor(
      () => {
        expect(
          screen.queryByText("Carregando projetos...")
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Check if projects are displayed
    expect(screen.getByText("E-commerce React")).toBeInTheDocument();
    expect(screen.getByText("Dashboard Analytics")).toBeInTheDocument();
    expect(screen.getByText("Blog Pessoal")).toBeInTheDocument();
  });

  it("displays project statistics cards", async () => {
    render(<DashboardPage />);

    await waitFor(
      () => {
        expect(
          screen.queryByText("Carregando projetos...")
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Check if basic stats cards are displayed
    expect(screen.getByText("Projetos Totais")).toBeInTheDocument();
    expect(screen.getByText("Em Destaque")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
    expect(screen.getByText("Deploying")).toBeInTheDocument();
    // Note: "Com Erro" only appears when there are error projects
  });
});
