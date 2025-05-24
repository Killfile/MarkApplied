browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sendData") {
        body_text = JSON.stringify(request.data)
        console.log("**Skills as Json**:" + request.data["skills"])
        console.log("**Body**:"+body_text)
        fetch(request.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body_text
        })
        .then(response => response.json())
        .then(data => {
            console.log("Fetch success in background script:", data);
            sendResponse({ success: true, response: data });
        })
        .catch(error => {
            console.error("Fetch error in background script:", error);
            sendResponse({ success: false, error: error.message });
        });
        return true; // Ensures sendResponse works asynchronously
    }
});