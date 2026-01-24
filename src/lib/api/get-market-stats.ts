const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getOverviewStats() {
  const response = await fetch(`${BACKEND_URL}/overview`);
  if (!response.ok) throw new Error("Failed to fetch: " + response.status);
  return response.json();
}

export async function getMarketVolumes() {
  const response = await fetch(`${BACKEND_URL}/market-volume/last-7-days`);
  if (!response.ok) throw new Error("Failed to fetch: " + response.status);
  return response.json();
}

export async function getMarketExchanges() {
  const response = await fetch(`${BACKEND_URL}/exchanges`);
  console.log('response: ', response)
  if (!response.ok) throw new Error("Failed to fetch: " + response.status);
  return response.json();
}