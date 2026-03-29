const baseUrl = import.meta.env.VITE_BACKEND;
const errObj = { errorMsg: "Something went wrong.Please try again." };

export async function createReport(reportData, token) {
  try {
    const res = await fetch(`${baseUrl}/reports/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: reportData
    })
    const data = await res.json();
    return { succ: res.ok, data };
  } catch (e) {
    console.error(e);
    return { succ: false, errObj };
  }
}

export async function getReports(params) {
  try {
    const query = new URLSearchParams();

    if (params.title) query.append("title", params.title);
    if (params.category) query.append("category", params.category);
    if (params.location) query.append("location", params.location);
    if (params.type) query.append("type", params.type);

    const res = await fetch(`${baseUrl}/reports?${query.toString()}`);
    const data = await res.json();
    return { succ: res.ok, data };
  } catch (e) {
    console.error(e);
    return { succ: false, data: errObj }
  }
}