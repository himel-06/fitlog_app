import type { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function fetchWorkouts(): Promise<Workout[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const res = await fetch(API_URL, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Server error (${res.status})`);

    const data = await res.json();

    // handle both [..] and { data: [..] } responses
    const list: Workout[] = Array.isArray(data) ? data : data.data;
    if (!Array.isArray(list)) throw new Error("Unexpected API response");

    // short delay so the loading animation is visible; remove if you like
    await new Promise((r) => setTimeout(r, 600));
    return list;
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    if (e instanceof TypeError) {
      throw new Error("Could not reach the API (network or CORS issue).");
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}