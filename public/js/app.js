<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xsight - AI Query Builder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .status {
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
        }
        .success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .loading {
            background: #cce5ff;
            color: #004085;
            border: 1px solid #b8daff;
        }
        pre {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Xsight App - Deployment Test</h1>
        <p>This page tests if all resources are loading correctly on GitHub Pages.</p>
        
        <div id="test-results">
            <div class="status loading">Testing deployment...</div>
        </div>

        <h2>Manual Tests:</h2>
        <div id="manual-tests"></div>

        <h2>Console Output:</h2>
        <pre id="console-output"></pre>
    </div>

    <script>
        const results = document.getElementById('test-results');
        const manualTests = document.getElementById('manual-tests');
        const consoleOutput = document.getElementById('console-output');
        let logs = [];

        // Override console.log to capture output
        const originalLog = console.log;
        console.log = function(...args) {
            originalLog.apply(console, args);
            logs.push(args.join(' '));
            consoleOutput.textContent = logs.join('\n');
        };

        // Test function
        async function testResource(url, type = 'text') {
            const testDiv = document.createElement('div');
            testDiv.className = 'status loading';
            testDiv.textContent = `Testing: ${url}`;
            results.appendChild(testDiv);

            try {
                const response = await fetch(url);
                if (response.ok) {
                    testDiv.className = 'status success';
                    testDiv.textContent = `✓ ${url} - Status: ${response.status}`;
                    if (type === 'module') {
                        testDiv.textContent += ' (Module exists)';
                    }
                } else {
                    testDiv.className = 'status error';
                    testDiv.textContent = `✗ ${url} - Status: ${response.status}`;
                }
            } catch (error) {
                testDiv.className = 'status error';
                testDiv.textContent = `✗ ${url} - Error: ${error.message}`;
            }
        }

        // Run tests
        async function runTests() {
            console.log('Starting deployment tests...');
            
            // Test CSS files
            await testResource('public/css/main.css');
            await testResource('public/css/components.css');
            await testResource('public/css/responsive.css');
            
            // Test JavaScript modules
            await testResource('public/js/app.js', 'module');
            await testResource('public/js/config/firebase-config.js', 'module');
            await testResource('public/js/modules/router.js', 'module');
            await testResource('public/js/modules/auth.js', 'module');
            await testResource('public/js/modules/projects.js', 'module');
            await testResource('public/js/modules/agents.js', 'module');
            await testResource('public/js/modules/ui.js', 'module');
            await testResource('public/js/modules/fileUpload.js', 'module');
            
            // Test page modules
            await testResource('public/js/pages/home.js', 'module');
            await testResource('public/js/pages/login.js', 'module');
            await testResource('public/js/pages/signup.js', 'module');
            await testResource('public/js/pages/about.js', 'module');

            // Manual load test
            manualTests.innerHTML = `
                <button onclick="loadApp()">Try Loading Full App</button>
                <button onclick="window.location.href='index.html'">Go to Main App</button>
            `;

            console.log('Tests completed!');
        }

        // Function to load the full app
        window.loadApp = async function() {
            try {
                const script = document.createElement('script');
                script.type = 'module';
                script.textContent = `
                    import XsightApp from './public/js/app.js';
                    console.log('App module loaded successfully!');
                    window.XsightApp = XsightApp;
                `;
                document.body.appendChild(script);
            } catch (error) {
                console.error('Failed to load app:', error);
            }
        };

        // Run tests when page loads
        runTests();
    </script>
</body>
</html>
