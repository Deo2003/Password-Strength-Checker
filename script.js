async function checkLiveStrength() {
    const password = document.getElementById("password").value;
    const feedbackDiv = document.getElementById("live-feedback");

    if (password.length === 0) {
        feedbackDiv.innerHTML = "";
        return;
    }

    // Make an API request to Flask for live feedback
    const response = await fetch("/check-live", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
    });

    const result = await response.json();
    let feedbackHtml = `<p>Strength: <strong>${result.strength}</strong></p><ul>`;
    result.feedback.forEach(item => {
        feedbackHtml += `<li>${item}</li>`;
    });
    feedbackHtml += "</ul>";
    feedbackDiv.innerHTML = feedbackHtml;
}
