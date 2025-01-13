async function checkLiveStrength() {
    const password = document.getElementById("password").value;
    const feedbackDiv = document.getElementById("live-feedback");
    const ringBar = document.getElementById("ring-bar");

    // Show buffering animation immediately
    feedbackDiv.innerHTML = "<p>Calculating strength...</p>";
    ringBar.style.background = "conic-gradient(lightgray 0%, lightgray 100%)";
    ringBar.querySelector("span").innerText = "Calculating...";

    if (password.length === 0) {
        feedbackDiv.innerHTML = "<p>Enter a password to check strength.</p>";
        ringBar.querySelector("span").innerText = "0%";
        return;
    }

    // Simulate delay for calculation
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
    }, 1000); // Simulate a 1-second delay
}
