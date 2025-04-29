// Server Component
import { Suspense } from "react";

import AnalyseClient from "./client";

async function getUserData() {
  try {
    const res = await fetch("http://localhost:8000/user", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const json = await res.json();
    const user = JSON.parse(json.user);
    return { data: user, status: res.status };
  } catch (error) {
    console.error("Server-side data fetching error:", error);
    return {
      status: 500,
      error: "Failed to load user data. Please try again later.",
    };
  }
}

export default async function Analyse() {
  const serverData = await getUserData();

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
            <div className="text-lg font-medium text-gray-700">
              Loading analysis...
            </div>
          </div>
        </div>
      }
    >
      <AnalyseClient serverData={serverData} />
    </Suspense>
  );
}
