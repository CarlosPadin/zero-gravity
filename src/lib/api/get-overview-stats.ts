export async function getOverviewStats() {
  const response = await fetch("http://127.0.0.1:8000/metrics/overview");
  if (!response.ok) throw new Error("Failed to fetch: " + response.status);
  return response.json();
}