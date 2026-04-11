const baseUrl = import.meta.env.VITE_BACKEND;
const errObj = { errorMsg: "Something went wrong.Please try again." };

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

    let resolvedReports = 0;
    for (const r of reports)
      if(r.status == 'closed')
        resolvedReports++;

    for (const r of reports) {
      if (r.type === "lost") lostReports.push(r);
      else if (r.type === "found") foundReports.push(r);
    }
    return { lostReports, foundReports, resolvedReports };
  } catch (e) {
    console.error(e);
  }
}

export async function getUserById(id){
  try {
    const res = await fetch(`${baseUrl}/users/${id}`, {
      method: "GET",
    })
    const data = await res.json()
    return {succ: res.ok, data}
  } catch (e) {
    console.error(e);
    return {succ:false, data:errObj}
  }
}