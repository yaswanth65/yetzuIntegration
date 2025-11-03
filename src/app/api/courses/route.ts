import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://productionyetzuapi.yetzu.com/api/course/v1/courselist", {
      cache: "no-store", // prevents stale data
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
