export async function getValidIdToken() {
  const userStr = localStorage.getItem("user");
  if (!userStr) return;

  const user = JSON.parse(userStr);

  if (!user.idToken) return;

  if (Date.now() < user.expiresIn) {
    return user.idToken;
  }

  // Otherwise, refresh token
  const res = await fetch(`https://securetoken.googleapis.com/v1/token?key=${import.meta.env.VITE_FIREBASE_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: user.refreshToken,
    }),
  });

  const data = await res.json();
  if (!data.id_token) throw new Error("Failed to refresh token");

  // Update user info locally
  user.idToken = data.id_token;
  user.refreshToken = data.refresh_token;
  user.expiresIn = Date.now() + parseInt(data.expires_in) * 1000;

  localStorage.setItem("user", JSON.stringify(user));

  return user.idToken;
}

setInterval(async () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return;
  const user = JSON.parse(userStr);
  if (Date.now() > user.expiresIn - 60 * 1000) { // refresh 1 min before expiration
    await getValidIdToken();
  }
}, 30 * 1000); // check every 30s