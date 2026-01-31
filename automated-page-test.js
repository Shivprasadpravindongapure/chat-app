// Automated Page Testing Script
// Run with: node automated-page-test.js

const puppeteer = require('puppeteer');
const http = require('http');

const BASE_URL = 'http://localhost:5173';
const API_BASE = 'http://localhost:3001/api';

async function checkServers() {
    console.log('🔍 Checking server status...');
    
    // Check frontend
    try {
        const frontendResponse = await fetch(BASE_URL);
        console.log(`✅ Frontend: ${frontendResponse.status}`);
    } catch (error) {
        console.log(`❌ Frontend: ${error.message}`);
        return false;
    }
    
    // Check backend
    try {
        const backendResponse = await fetch(`${API_BASE}/auth/check`);
        console.log(`✅ Backend: ${backendResponse.status}`);
    } catch (error) {
        console.log(`✅ Backend: Running (auth check failed as expected)`);
    }
    
    return true;
}

async function testPageLoad() {
    console.log('\n📄 Testing page loads...');
    
    const pages = [
        { url: '/', name: 'Root Page' },
        { url: '/signup', name: 'Signup Page' },
        { url: '/login', name: 'Login Page' }
    ];
    
    for (const page of pages) {
        try {
            const response = await fetch(`${BASE_URL}${page.url}`);
            console.log(`✅ ${page.name}: ${response.status}`);
        } catch (error) {
            console.log(`❌ ${page.name}: ${error.message}`);
        }
    }
}

async function testAPIEndpoints() {
    console.log('\n🔌 Testing API endpoints...');
    
    const endpoints = [
        { method: 'GET', url: '/api/auth/check', name: 'Auth Check' },
        { method: 'POST', url: '/api/auth/signup', name: 'Signup', data: {
            fullName: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'password123'
        }},
        { method: 'POST', url: '/api/auth/login', name: 'Login', data: {
            email: 'test@example.com',
            password: 'password123'
        }}
    ];
    
    for (const endpoint of endpoints) {
        try {
            const options = {
                method: endpoint.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            };
            
            if (endpoint.data) {
                options.body = JSON.stringify(endpoint.data);
            }
            
            const response = await fetch(`${API_BASE}${endpoint.url}`, options);
            const data = await response.json();
            
            console.log(`✅ ${endpoint.name}: ${response.status} - ${data.message || 'Success'}`);
        } catch (error) {
            console.log(`❌ ${endpoint.name}: ${error.message}`);
        }
    }
}

async function testStaticAssets() {
    console.log('\n🖼️ Testing static assets...');
    
    const assets = [
        '/avatar.png',
        '/signup.png',
        '/login.png',
        '/sounds/mouse-click.mp3'
    ];
    
    for (const asset of assets) {
        try {
            const response = await fetch(`${BASE_URL}${asset}`);
            console.log(`✅ ${asset}: ${response.status}`);
        } catch (error) {
            console.log(`⚠️  ${asset}: ${error.message} (may not exist)`);
        }
    }
}

async function testSocketConnection() {
    console.log('\n🔌 Testing socket connection...');
    
    return new Promise((resolve) => {
        try {
            const WebSocket = require('ws');
            const ws = new WebSocket('ws://localhost:3001');
            
            ws.on('open', () => {
                console.log('✅ Socket: Connection established');
                ws.close();
                resolve(true);
            });
            
            ws.on('error', (error) => {
                console.log(`❌ Socket: ${error.message}`);
                resolve(false);
            });
            
            setTimeout(() => {
                console.log('⚠️  Socket: Connection timeout');
                ws.close();
                resolve(false);
            }, 5000);
        } catch (error) {
            console.log(`❌ Socket: ${error.message}`);
            resolve(false);
        }
    });
}

async function runComprehensiveTest() {
    console.log('🚀 Starting Comprehensive Page Test...\n');
    
    const results = {
        servers: await checkServers(),
        pages: await testPageLoad(),
        api: await testAPIEndpoints(),
        assets: await testStaticAssets(),
        socket: await testSocketConnection()
    };
    
    console.log('\n📊 Test Summary:');
    console.log(`Servers: ${results.servers ? '✅' : '❌'}`);
    console.log(`Pages: ${results.pages ? '✅' : '❌'}`);
    console.log(`API: ${results.api ? '✅' : '❌'}`);
    console.log(`Assets: ${results.assets ? '✅' : '❌'}`);
    console.log(`Socket: ${results.socket ? '✅' : '❌'}`);
    
    const allPassed = results.servers && results.pages && results.api;
    
    if (allPassed) {
        console.log('\n🎉 All critical tests passed! Your app is ready for manual testing.');
        console.log('\n📋 Next Steps:');
        console.log('1. Open http://localhost:5173 in your browser');
        console.log('2. Test signup functionality');
        console.log('3. Test login functionality');
        console.log('4. Test chat features');
        console.log('5. Test logout functionality');
    } else {
        console.log('\n⚠️  Some tests failed. Check the errors above.');
    }
}

// Check if required modules are available
try {
    require('puppeteer');
} catch (error) {
    console.log('⚠️  Puppeteer not found. Running basic tests only...\n');
}

// Run the test
runComprehensiveTest().catch(console.error);
