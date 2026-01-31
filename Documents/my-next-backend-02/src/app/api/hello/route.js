import { NextResponse } from "next/server";
import corsHeaders from "@/lib/cors";
import { headers } from "next/headers";

export async function OPTIONS(req) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET() {
  return NextResponse.json({ message: "Hello, World!" },{headers: corsHeaders});

  
}