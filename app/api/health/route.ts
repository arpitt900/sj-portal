import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    // Check Supabase connection
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("karigars").select("id").limit(1)

    if (error) {
      throw error
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      environment: process.env.NODE_ENV,
      version: "1.0.0",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error.message,
        environment: process.env.NODE_ENV,
      },
      { status: 500 },
    )
  }
}
