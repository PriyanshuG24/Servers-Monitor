export const getAlerts = async () => {
  const res = await fetch('/api/alerts');
  if (!res.ok) throw new Error('Failed to fetch alerts');
  return res.json();
};

export const getMetrics = async () => {
  const res = await fetch('/api/metrics');
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json();
};

export const getServers = async () => {
  const res = await fetch('/api/servers');
  if (!res.ok) throw new Error('Failed to fetch servers');
  return res.json();
};
