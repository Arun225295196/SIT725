#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment process for SIT725 7.2P...\n');

// Check if we're in a git repository
function checkGitRepository() {
    try {
        execSync('git status', { stdio: 'ignore' });
        console.log('✅ Git repository detected');
        return true;
    } catch (error) {
        console.log('❌ Not a git repository. Please initialize git first.');
        console.log('Run: git init && git add . && git commit -m "Initial commit"');
        return false;
    }
}

// Check if package.json exists
function checkPackageJson() {
    if (fs.existsSync('package.json')) {
        console.log('✅ package.json found');
        return true;
    } else {
        console.log('❌ package.json not found');
        return false;
    }
}

// Install dependencies
function installDependencies() {
    try {
        console.log('📦 Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed successfully');
        return true;
    } catch (error) {
        console.log('❌ Failed to install dependencies');
        return false;
    }
}

// Run tests
function runTests() {
    try {
        console.log('🧪 Running tests...');
        execSync('npm test', { stdio: 'inherit' });
        console.log('✅ All tests passed');
        return true;
    } catch (error) {
        console.log('❌ Tests failed. Please fix failing tests before deployment.');
        return false;
    }
}

// Check if all required files exist
function checkRequiredFiles() {
    const requiredFiles = [
        'server.js',
        'public/index.html',
        'controllers/projectController.js',
        'services/projectService.js',
        'models/project.js',
        'routes/projects.js'
    ];

    console.log('📁 Checking required files...');
    
    for (const file of requiredFiles) {
        if (fs.existsSync(file)) {
            console.log(`✅ ${file}`);
        } else {
            console.log(`❌ Missing: ${file}`);
            return false;
        }
    }
    
    return true;
}

// Create deployment info
function createDeploymentInfo() {
    const deploymentInfo = {
        timestamp: new Date().toISOString(),
        version: require('../package.json').version,
        nodeVersion: process.version,
        features: [
            'MVC Architecture',
            'Socket.IO Real-time Communication',
            'RESTful API',
            'Real-time Chat',
            'Live Project Updates',
            'User Presence Tracking',
            'Comprehensive Testing'
        ],
        endpoints: {
            web: 'http://localhost:3000',
            api: 'http://localhost:3000/api/projects',
            socket: 'ws://localhost:3000'
        },
        testCoverage: 'Run `npm test -- --coverage` to see coverage report'
    };

    fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
    console.log('✅ Deployment info created');
}

// Git operations
function gitOperations() {
    try {
        console.log('📝 Checking git status...');
        
        // Check if there are changes to commit
        try {
            execSync('git diff --exit-code', { stdio: 'ignore' });
            execSync('git diff --cached --exit-code', { stdio: 'ignore' });
            console.log('✅ No uncommitted changes');
        } catch (error) {
            console.log('📝 Uncommitted changes detected. Adding to git...');
            execSync('git add .', { stdio: 'inherit' });
            
            const commitMessage = `SIT725 7.2P: Socket.IO implementation - ${new Date().toISOString()}`;
            execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
            console.log('✅ Changes committed to git');
        }
        
        return true;
    } catch (error) {
        console.log('❌ Git operations failed');
        console.log('Please commit your changes manually');
        return false;
    }
}

// Print deployment summary
function printSummary() {
    console.log('\n🎉 Deployment Preparation Complete!');
    console.log('\n📋 Summary:');
    console.log('   • MVC Architecture ✅');
    console.log('   • Socket.IO Integration ✅');
    console.log('   • Real-time Features ✅');
    console.log('   • Comprehensive Tests ✅');
    console.log('   • Git Repository ✅');
    
    console.log('\n🚀 Next Steps:');
    console.log('   1. Push to GitHub: git push origin main');
    console.log('   2. Take screenshots of:');
    console.log('      - Application running (npm start)');
    console.log('      - Multiple users online');
    console.log('      - Real-time chat working');
    console.log('      - Live project updates');
    console.log('      - Test results (npm test)');
    console.log('   3. Create PDF with screenshots + GitHub link');
    console.log('   4. Submit to OnTrack');
    
    console.log('\n🔗 Quick Commands:');
    console.log('   • Start server: npm start');
    console.log('   • Run tests: npm test');
    console.log('   • Development: npm run dev');
    console.log('   • Test coverage: npm test -- --coverage');
    
    console.log('\n📝 For SIT725 7.2P Submission:');
    console.log('   • Ensure GitHub repo is accessible');
    console.log('   • Include comprehensive screenshots');
    console.log('   • Demonstrate Socket.IO functionality');
    console.log('   • Show test results');
}

// Main deployment function
function deploy() {
    console.log('SIT725 7.2P - Socket Programming Deployment\n');
    console.log('==========================================\n');
    
    // Run all checks
    if (!checkGitRepository()) return false;
    if (!checkPackageJson()) return false;
    if (!checkRequiredFiles()) return false;
    if (!installDependencies()) return false;
    if (!runTests()) return false;
    
    // Create deployment artifacts
    createDeploymentInfo();
    
    // Git operations
    gitOperations();
    
    // Print summary
    printSummary();
    
    return true;
}

// Run deployment
if (require.main === module) {
    const success = deploy();
    process.exit(success ? 0 : 1);
}

module.exports = { deploy };