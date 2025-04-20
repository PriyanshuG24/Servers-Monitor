const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

export const getAlerts = async () => {
  const res = await fetch(`${BASE_URL}/api/alerts`);
  if (!res.ok) throw new Error('Failed to fetch alerts');
  return res.json();
};

export const getMetrics = async () => {
  const res = await fetch(`${BASE_URL}/api/metrics`);
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json();
};

export const getServers = async () => {
  const res = await fetch(`${BASE_URL}/api/servers`);
  if (!res.ok) throw new Error('Failed to fetch servers');
  return res.json();
};
