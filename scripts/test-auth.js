const axios = require("axios");
const API_BASE_URL = "http://localhost:3000";
const creds = [
  { n: "Student", e: "student@yetzu.com", p: "SecurePass@123" },
  { n: "Educator", e: "testeducator@yetzu.com", p: "SecurePass@123" },
  { n: "Admin", e: "yetzuadmin@yetzu.com", p: "YetzuAdmin@123" },
];
async function testAll() {
  console.log("=".repeat(50));
  console.log("Testing Auth APIs");
  console.log("=".repeat(50));
  for (const c of creds) {
    console.log("\n--- Testing " + c.n + " ---");
    try {
      const r = await axios.post(API_BASE_URL + "/api/identityapi/v1/auth/signin", { email: c.e, password: c.p }, { validateStatus: () => true });
      console.log("Status: " + r.status);
      console.log("Response: " + JSON.stringify(r.data));
    } catch (err) { console.log("Error: " + err.message); }
  }
  console.log("\n--- Testing Educator Overview ---");
  try {
    const loginRes = await axios.post(API_BASE_URL + "/api/identityapi/v1/auth/signin", { email: "testeducator@yetzu.com", password: "SecurePass@123" }, { validateStatus: () => true });
    if (loginRes.data.success) {
      const token = loginRes.data.data.accessToken;
      console.log("Token: " + token.substring(0, 30) + "...");
      const overview = await axios.get(API_BASE_URL + "/api/proxy/api/educator/overview", { headers: { Authorization: "Bearer " + token }, validateStatus: () => true });
      console.log("Overview Status: " + overview.status);
      console.log("Overview Data: " + JSON.stringify(overview.data));
    }
  } catch (err) { console.log("Error: " + err.message); }
  console.log("\n" + "=".repeat(50));
}
testAll().catch(console.error);