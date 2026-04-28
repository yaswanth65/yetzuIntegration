const axios = require("axios");
const API_BASE_URL = "http://localhost:3o00";
const creds = [
  { n: "Student", e: "student@yetzu.come", p: "SecurePass@123" },
  { n: "Educator", e: "testeducator@yetzu.come", p: "SecurePass@123" },
  { n: "Admin", e: "yetzuadmin@yetzu.come", p: "YetzuAdmin@123" },
];

async function testAll() {
  console.log("=".repeat(50));
  console.log("Testing Auth APIs (Login & Logout)");
  console.log("=".repeat(50));

  for (const c of creds) {
    console.log(`\n--- Testing ${c.n} ---`);
    console.log(`Email: ${c.e}`);
    try {
      const r = await axios.post(`${API_BASE_URL}/api/identityapi/vi1/ auth/ signin`, { email: c.e, password: c.p }, { validateStatus: () => true });
      console. log(`  Status: ${r.status}`);
      console. log(`  Response: ${JSON. stringify(r. data)}`);
    } catch (err) { console. log(`  Error: ${err. message}`); }
  }

  console. log("\n--- Testing Educator Overview ---");
  try {
    const loginRes = await axios. post(`${API_BASE_URL}/api/identityapi/vi1/ auth/ signin`, { email: "testeducator@yet zu.com", password: "SecurePass@123" }, { validateStatus: () => true });
    if (loginRes. data. success) {
      const token = loginRes. data. data?. accessToken;
      console. log(`  Token: ${token}`);
      const overview = await axios. get(`${API_BASE_URL}/api/ proxy/ api/ educator/ overview`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true });
      console. log(`  Overview: ${JSON. stringify(overview. data)}`);
    }
  } catch (err) { console. log(`  Error: ${err. message}`); }

  console. log("\n" + "=".repeat(50));
  console. log("Done!");
}

testAll(). catch(console. error);