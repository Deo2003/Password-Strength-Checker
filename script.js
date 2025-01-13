async function checkLiveStrength() {
    const password = document.getElementById("password").value;
    const feedbackDiv = document.getElementById("live-feedback");
    const ringBar = document.getElementById("ring-bar");

    // Array of security facts
    const securityFacts = [
        "Use a unique password for every account to reduce the impact of a data breach.",
        "Enable two-factor authentication (2FA) whenever possible for an extra layer of security.",
        "Avoid using easily guessed passwords like 'password123' or '123456'.",
        "Longer passwords are stronger; aim for at least 12 characters.",
        "Avoid using personal information like birthdays in your passwords.",
        "A password manager can help generate and store secure passwords.",
        "Change your passwords regularly to enhance account security.",
        "Beware of phishing emails that try to steal your login credentials.",
        "Do not reuse passwords across critical accounts.",
        "Avoid saving passwords in plain text on your devices.",
    ];

    // Select a random fact
    const randomFact = securityFacts[Math.floor(Math.random() * securityFacts.length)];

    // Show buffering animation and security fact
    feedbackDiv.innerHTML = `<p>Calculating strength...</p><p>Tip: ${randomFact}</p>`;
    ringBar.style.background = "conic-gradient(lightgray 0%, lightgray 100%)";
    ringBar.querySelector("span").innerText = "Calculating...";

    if (password.length === 0) {
        feedbackDiv.innerHTML = "<p>Enter a password to check strength.</p>";
        ringBar.querySelector("span").innerText = "0%";
        return;
    }

    // Simulate delay for calculation (10 seconds)
    setTimeout(async () => {
        try {
            // Fetch results from the Flask backend
            const response = await fetch("/check-live", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            // Process the response
            const result = await response.json();

            // Update the ring bar and feedback after delay
            const score = result.score;
            ringBar.style.background = `conic-gradient(
                #007bff 0%,
                #007bff ${score}%,
                lightgray ${score}%,
                lightgray 100%
            )`;
            ringBar.querySelector("span").innerText = `${score}%`;

            // Display feedback
            let feedbackHtml = `<p>Strength: <strong>${result.strength}</strong></p><ul>`;
            result.feedback.forEach((item) => {
                feedbackHtml += `<li>${item}</li>`;
            });
            feedbackHtml += "</ul>";
            feedbackDiv.innerHTML = feedbackHtml;
        } catch (error) {
            feedbackDiv.innerHTML = "<p>An error occurred while calculating strength. Please try again.</p>";
            console.error("Error fetching password strength:", error);
        }
    }, 10000); // 10-second delay
}
