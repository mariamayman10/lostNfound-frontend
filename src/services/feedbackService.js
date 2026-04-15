const baseUrl = import.meta.env.VITE_BACKEND;
const errObj = { errorMsg: "Something went wrong.Please try again." };


export async function createFeedback(feedback, token) {
  try {
    const res = await fetch(`${baseUrl}/feedback`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(feedback),
    });
    const data = await res.json();
    return { succ: res.ok, data };
  } catch (e) {
    console.error(e);
    return { succ: false, data: errObj }
  }
}

export async function getFeedbacks(limit) {
  try {
    const res = await fetch(`${baseUrl}/feedback?limit=${limit}`, {
      method: "GET"
    });
    const data = await res.json();
    return { succ: res.ok, data };
  } catch (e) {
    console.error(e);
    return { succ: false, data: errObj }
  }
}


