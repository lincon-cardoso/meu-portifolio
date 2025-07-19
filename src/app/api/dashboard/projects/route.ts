/**
 * API ROUTE PARA BUSCAR PROJETOS DO DASHBOARD
 * /api/dashboard/projects
 */

import { NextResponse } from "next/server";
import { ProjectService } from "@/lib/database-utils";

export async function GET() {
  try {
    // Buscar todos os projetos usando o ProjectService
    const projects = await ProjectService.getAllProjects();

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar projetos:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
