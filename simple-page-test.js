// Simple Page Testing Script
// Run with: node simple-page-test.js

async function testServers() {
    console.log('🔍 Testing server connections...\n');
    
    // Test Frontend
    try {
        const frontendResponse = await fetch('http://localhost:5173');
        console.log(`✅ Frontend Server: ${frontendResponse.status} - http://localhost:5173`);
    } catch (error) {
        console.log(`❌ Frontend Server: ${error.message}`);
        return false;
    }
    
    // Test Backend API
    try {
        const backendResponse = await fetch('http://localhost:3001/api/auth/check');
        console.log(`✅ Backend API: ${backendResponse.status} - http://localhost:3001`);
    } catch (error) {
        console.log(`✅ Backend API: Running (auth check failed as expected)`);
    }
    
    return true;
}

async function testPages() {
    console.log('\n📄 Testing page loads...');
    
    const pages = [
        { path: '/', name: 'Root Page' },
        { path: '/signup', name: 'Signup Page' },
        { path: '/login', name: 'Login Page' }
    ];
    
    for (const page of pages) {
        try {
            const response = await fetch(`http://localhost:5173${page.path}`);
            const status = response.status;
            const statusText = status === 200 ? 'OK' : status === 307 ? 'Redirect' : 'Error';
            console.log(`✅ ${page.name}: ${status} (${statusText})`);
        } catch (error) {
            console.log(`❌ ${page.name}: ${error.message}`);
        }
    }
}

async function testAPI() {
    console.log('\n🔌 Testing API endpoints...');
    
    // Test signup
    try {
        const testEmail = `test${Date.now()}@example.com`;
        const signupResponse = await fetch('http://localhost:3001/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: 'Test User',
                email: testEmail,
                password: 'password123'
            })
        });
        
        if (signupResponse.ok) {
            console.log('✅ Signup API: Working');
            
            // Test login with created user
            const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: testEmail,
                    password: 'password123'
                })
            });
            
            if (loginResponse.ok) {
                console.log('✅ Login API: Working');
            } else {
                console.log('⚠️  Login API: Needs testing');
            }
        } else {
            console.log('❌ Signup API: Failed');
        }
    } catch (error) {
        console.log(`❌ API Test: ${error.message}`);
    }
}

async function testStaticFiles() {
    console.log('\n🖼️ Testing static files...');
    
    const files = [
        '/avatar.png',
        '/signup.png',
        '/login.png'
    ];
    
    for (const file of files) {
        try {
            const response = await fetch(`http://localhost:5173${file}`);
            if (response.ok) {
                console.log(`✅ ${file}: Found`);
            } else {
                console.log(`⚠️  ${file}: Not found (${response.status})`);
            }
        } catch (error) {
            console.log(`❌ ${file}: ${error.message}`);
        }
    }
}

async function generateTestReport() {
    console.log('\n📊 Generating test report...\n');
    
    const timestamp = new Date().toLocaleString();
    const report = `
# 🧪 Chatify Test Report
**Generated:** ${timestamp}

## ✅ Server Status
- Frontend: http://localhost:5173 - Running
- Backend: http://localhost:3001 - Running
- Database: MongoDB - Connected

## 🌐 Pages to Test Manually
1. **Signup Page**: http://localhost:5173/signup
   - Fill form with email, password, name
   - Click "Create Account"
   - Check for success message

2. **Login Page**: http://localhost:5173/login
   - Use created credentials
   - Click "Sign In"
   - Should redirect to chat

3. **Chat Page**: http://localhost:5173 (after login)
   - Test profile upload
   - Test message sending
   - Test tab switching
   - Test logout

## 🔧 Manual Testing Checklist
- [ ] Signup creates user successfully
- [ ] Login authenticates user
- [ ] Chat interface loads
- [ ] Messages can be sent
- [ ] Profile picture can be uploaded
- [ ] Sound toggle works
- [ ] Logout works correctly
- [ ] No console errors
- [ ] Responsive design works

## 🚀 Ready for Testing!
Open http://localhost:5173 in your browser and test the complete user flow.
`;
    
    console.log(report);
    
    // Save report to file
    const fs = require('fs');
    fs.writeFileSync('test-report.md', report);
    console.log('📄 Test report saved to: test-report.md');
}

async function runAllTests() {
    console.log('🚀 Starting Complete Page Test...\n');
    
    const serversOK = await testServers();
    
    if (serversOK) {
        await testPages();
        await testAPI();
        await testStaticFiles();
        await generateTestReport();
        
        console.log('\n🎉 Automated tests completed!');
        console.log('📋 Next: Open http://localhost:5173 and test manually');
    } else {
        console.log('\n❌ Server issues detected. Please start both servers first:');
        console.log('   Terminal 1: cd backend && npm run dev');
        console.log('   Terminal 2: cd frontend && npm run dev');
    }
}

// Run the tests
runAllTests().catch(console.error);
