/**
 * API ROUTE PARA BUSCAR DADOS DO DASHBOARD
 * /api/dashboard/stats
 */

import { NextResponse } from "next/server";
import { DashboardService } from "@/lib/database-utils";

export async function GET() {
  try {
    // Buscar estatísticas usando o DashboardService
    const stats = await DashboardService.getDashboardStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar stats do dashboard:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
