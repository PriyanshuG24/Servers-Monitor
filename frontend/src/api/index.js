export const getAlerts = async () => {
    const res = await fetch('https://servers-monitor-idq2.vercel.app/api/alerts');
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return res.json();
  };
  
  export const getMetrics = async () => {
    const res = await fetch('https://servers-monitor-idq2.vercel.app/api/metrics');
    if (!res.ok) throw new Error('Failed to fetch metrics');
    return res.json();
  };
  
  export const getServers = async () => {
    const res = await fetch('https://servers-monitor-idq2.vercel.app/api/servers');
    if (!res.ok) throw new Error('Failed to fetch servers');
    return res.json();
  };
  