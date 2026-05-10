const testApi = async () => {
    try {
        console.log("Attempting login...");
        const loginRes = await fetch("https://watchselling-website-mern.onrender.com/api/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "debug_admin",
                password: "admin123"
            })
        });
        
        const loginData = await loginRes.json();
        if (!loginRes.ok) {
            console.log("Login failed:", loginData);
            return;
        }

        const token = loginData.accessToken;
        console.log("Login successful, token obtained.");

        // Testing Legacy Header support
        console.log("Testing support for legacy 'token' header...");
        const legacyRes = await fetch("https://watchselling-website-mern.onrender.com/api/orders", {
            method: 'GET',
            headers: { 'token': `Bearer ${token}` }
        });
        console.log(`Legacy Header Status: ${legacyRes.status} (Expected 200 or 403 if data exists/not admin)`);

        // Testing Standard Header
        console.log("Testing support for standard 'Authorization' header...");
        const standardRes = await fetch("https://watchselling-website-mern.onrender.com/api/orders", {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`Standard Header Status: ${standardRes.status} (Expected 200)`);
        
        if (standardRes.ok) {
            console.log("Verification SUCCESS: Standard header is accepted.");
        } else {
            console.log("Verification FAILURE: Standard header rejected.");
        }

    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
};

testApi();
