export async function getOverviewStats() {
  const response = await fetch("http://127.0.0.1:8000/metrics/overview");
  if (!response.ok) throw new Error("Failed to fetch: " + response.status);
  return response.json();
}

export async function getMarketVolumes() {
  const response = await fetch("http://127.0.0.1:8000/market-volume/last-7-days");
  if (!response.ok) throw new Error("Failed to fetch: " + response.status);
  return response.json();
}

export async function getMarketExchanges() {
  const response = await fetch("http://127.0.0.1:8000/exchanges/latest");
  console.log('response: ', response)
  if (!response.ok) throw new Error("Failed to fetch: " + response.status);
  return response.json();
}