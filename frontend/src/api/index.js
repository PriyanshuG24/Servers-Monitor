export const getAlerts = async () => {
  const res = await fetch('/api/alerts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch alerts');
  return res.json();
};

export const getMetrics = async () => {
  const res = await fetch('/api/metrics', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json();
};

export const getServers = async () => {
  const res = await fetch('/api/servers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch servers');
  return res.json();
};
