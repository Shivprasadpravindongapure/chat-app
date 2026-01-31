// Test file for all API endpoints
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api';

// Test data
const testUser = {
  fullName: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

async function testAPI() {
  console.log('🚀 Starting API Tests...\n');

  try {
    // Test 1: Signup
    console.log('1️⃣ Testing Signup...');
    try {
      const signupResponse = await axios.post(`${API_BASE_URL}/auth/signup`, testUser, {
        withCredentials: true
      });
      console.log('✅ Signup Success:', signupResponse.data);
      console.log('🍪 Cookies:', signupResponse.headers['set-cookie']);
    } catch (error) {
      console.log('❌ Signup Failed:', error.response?.data || error.message);
    }

    // Test 2: Login
    console.log('\n2️⃣ Testing Login...');
    try {
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      }, {
        withCredentials: true
      });
      console.log('✅ Login Success:', loginResponse.data);
    } catch (error) {
      console.log('❌ Login Failed:', error.response?.data || error.message);
    }

    // Test 3: Check Auth
    console.log('\n3️⃣ Testing Auth Check...');
    try {
      const authResponse = await axios.get(`${API_BASE_URL}/auth/check`, {
        withCredentials: true
      });
      console.log('✅ Auth Check Success:', authResponse.data);
    } catch (error) {
      console.log('❌ Auth Check Failed:', error.response?.data || error.message);
    }

    // Test 4: Logout
    console.log('\n4️⃣ Testing Logout...');
    try {
      const logoutResponse = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        withCredentials: true
      });
      console.log('✅ Logout Success:', logoutResponse.data);
    } catch (error) {
      console.log('❌ Logout Failed:', error.response?.data || error.message);
    }

  } catch (error) {
    console.log('🔥 Critical Error:', error.message);
  }
}

// Run tests
testAPI().then(() => {
  console.log('\n🏁 API Tests Complete!');
}).catch(error => {
  console.log('💥 Test Suite Error:', error);
});
