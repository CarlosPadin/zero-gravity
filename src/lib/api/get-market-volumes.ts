export async function getMarketVolumes() {
  const response = await fetch("http://127.0.0.1:8000/market-volume/last-7-days");
  if (!response.ok) throw new Error("Failed to fetch: " + response.status);
  return response.json();
}