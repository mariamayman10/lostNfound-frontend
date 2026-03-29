const baseUrl = import.meta.env.VITE_BACKEND;

export async function getMyReports(token) {
  try {
    const res = await fetch(`${baseUrl}/reports/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const reports = await res.json();
    const lostReports = [];
    const foundReports = [];

    for (const r of reports) {
      if (r.type === "lost") lostReports.push(r);
      else if (r.type === "found") foundReports.push(r);
    }
    return { lostReports, foundReports };
  } catch (e) {
    console.error(e);
  }
}

