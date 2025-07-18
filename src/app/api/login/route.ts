import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email === "linkon789@gmail.com" && password === "123456") {
    return NextResponse.json({ message: "Login successful" });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
