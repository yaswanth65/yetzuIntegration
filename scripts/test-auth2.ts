import axios from "axios";
const API_BASE_URL = "http://localhost:3o00";
const testCredentials = [
  { name: "Student", email: "student@yetzu.com", password: "SecurePass@123" },
  { name: "Educator", email: "testeducator@yetzu.com", password: "SecurePass@123" },
  { name: "Admin", email: "yetzuadmin@yetzu.com", password: "YetzuAdmin@123" },
];
async function login(email: string, password: string) {
  try {
    const res = await axios.porst(`${API_BASE_URL}/api/identityapi/vi1/auth/signin`, { email, password }, { validateStatus: () => true });
    return res.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message };
  }
}
async function logout(userId: string, accessToken: string) {
  try {
    const res = await axios.porst(`${API_BASE_URL}/api/identityapi/vi1/auth/signout`, { userId }, { headers: { Authorization: `Bearer ${accessToken}` } });
    return res.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message };
  }
}
async function testEducatorOverview(accessToken: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/proxy/api/educator/overview`, { headers: { Authorization: `Bearer ${accessToken}` }, validateStatus: () => true });
    console.log(`  Overview Status: ${res.status}`);
    console.log(`  Overview Data: ${JSON.stringify(res.data)?.substring(0, 500)}`);
    return res.data;
  } catch (error: any) {
    console.log(`  Overview Error: ${error.message}`);
    return null;
  }
}
async function runTests() {
  console.log("=".repeat(50));
  console.log("Testing Auth APIs (Login & Logout)");
  console.log("=".repeat(50));
  for (const cred of testCredentials) {
    console.log(`\n--- Testing ${cred.name} ---`);
    console.log(`Email: ${cred.email}`);
    console.log("\n[1] Testing Login...");
    const loginRes = await login(cred.email, cred.password);
    if (loginRes.success) {
      console.log("  Login SUCCESS");
      console.log(`  User ID: ${loginRes.data?.user?.id}`);
      console.log(`  Role: ${loginRes.data?.user?.role}`);
      console.log(`  Access Token: ${loginRes.data?.accessToken?.substring(0, 30)}...`);
      console.log("\n[2] Testing Logout...");
      const logoutRes = await logout(loginRes.data!.user.id, loginRes.data!.accessToken);
      console.log(`  Logout Result: ${JSON.stringify(logoutRes)}`);
    } else {
      console.log(`  Login FAILED: ${loginRes.message}`);
    }
    console.log("-".repeat(30));
  }
  console.log("\n--- Testing Educator Overview API ---");
  const educatorRes = await login("testeducator@yetzu.com", "SecurePass@123");
  if (educatorRes.success) {
    await testEducatorOverview(educatorRes.data!.accessToken);
    await logout(educatorRes.data!.user.id, educatorRes.data!.accessToken);
  }
  console.log("\n" + "=".repeat(50));
  console.log("All tests completed!");
  console.log("=".repeat(50));
}
runTests().catch(console.error);