const baseUrl = import.meta.env.VITE_BACKEND;
const errObj = { errorMsg: "Something went wrong.Please try again." };

export async function loginUser(loginData) {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });
    const data = await res.json();
    return { succ: res.ok, data };
  } catch (e) {
    console.error(e)
    return { succ: false, errObj }
  }
}
export async function registerUser(registerData) {
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: registerData
    })
    const data = await res.json();
    return { succ: res.ok, data };
  } catch (e) {
    console.error(e)
    return { succ: false, errObj }
  }
}
