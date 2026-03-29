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
