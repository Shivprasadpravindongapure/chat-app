// Connection Test Script - Run with: node CONNECTION-TEST.js
const http = require('http');

console.log('🔌 Testing Port Connections...\n');

// Test Backend Port 3001
function testBackendPort() {
    return new Promise((resolve) => {
        console.log('1️⃣ Testing Backend Port 3001...');
        
        const req = http.request({
            hostname: 'localhost',
            port: 3001,
            path: '/',
            method: 'GET',
            timeout: 3000
        }, (res) => {
            console.log(`✅ Backend Responding: Status ${res.statusCode}`);
            resolve(true);
        });
        
        req.on('error', (err) => {
            console.log(`❌ Backend Error: ${err.message}`);
            resolve(false);
        });
        
        req.on('timeout', () => {
            console.log('❌ Backend Timeout');
            req.destroy();
            resolve(false);
        });
        
        req.end();
    });
}

// Test Frontend Port 5173
function testFrontendPort() {
    return new Promise((resolve) => {
        console.log('\n2️⃣ Testing Frontend Port 5173...');
        
        const req = http.request({
            hostname: 'localhost',
            port: 5173,
            path: '/',
            method: 'GET',
            timeout: 3000
        }, (res) => {
            console.log(`✅ Frontend Responding: Status ${res.statusCode}`);
            resolve(true);
        });
        
        req.on('error', (err) => {
            console.log(`❌ Frontend Error: ${err.message}`);
            resolve(false);
        });
        
        req.on('timeout', () => {
            console.log('❌ Frontend Timeout');
            req.destroy();
            resolve(false);
        });
        
        req.end();
    });
}

// Test API Endpoint
function testAPIEndpoint() {
    return new Promise((resolve) => {
        console.log('\n3️⃣ Testing API Endpoint...');
        
        const req = http.request({
            hostname: 'localhost',
            port: 3001,
            path: '/api/auth/check',
            method: 'GET',
            timeout: 3000
        }, (res) => {
            console.log(`✅ API Responding: Status ${res.statusCode}`);
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    console.log(`📄 API Response: ${JSON.stringify(parsed)}`);
                } catch (e) {
                    console.log(`📄 API Response: ${data}`);
                }
            });
            resolve(true);
        });
        
        req.on('error', (err) => {
            console.log(`❌ API Error: ${err.message}`);
            resolve(false);
        });
        
        req.on('timeout', () => {
            console.log('❌ API Timeout');
            req.destroy();
            resolve(false);
        });
        
        req.end();
    });
}

// Run all tests
async function runTests() {
    console.log('🚀 Starting Connection Tests...\n');
    
    const backend = await testBackendPort();
    const frontend = await testFrontendPort();
    const api = await testAPIEndpoint();
    
    console.log('\n📊 Test Results:');
    console.log(`Backend (3001): ${backend ? '✅ Connected' : '❌ Failed'}`);
    console.log(`Frontend (5173): ${frontend ? '✅ Connected' : '❌ Failed'}`);
    console.log(`API Endpoint: ${api ? '✅ Connected' : '❌ Failed'}`);
    
    if (backend && frontend && api) {
        console.log('\n🎉 All connections successful! Your app should work perfectly.');
    } else {
        console.log('\n⚠️ Some connections failed. Check:');
        if (!backend) console.log('- Backend server: cd backend && npm run dev');
        if (!frontend) console.log('- Frontend server: cd frontend && npm run dev');
        if (!api) console.log('- API routes: Check backend configuration');
    }
}

runTests().catch(console.error);
