var checkbox = document.getElementById("emailSent");

// Function to fetch ratio data
async function fetchRatio() {
  try {
    const response = await fetch("https://tizi-industrie.com/api/ratio");
    const data = await response.json();
    return data.ratio;
  } catch (error) {
    console.error("Error fetching ratio:", error);
    return null;
  }
}



// Function to send an email using EmailJS
function sendEmail(subject, message) {
  emailjs
    .send("service_9nq07bi", "template_ftu6i5w", {
      from_name: "crypto_tracker@gmail.com",
      to_name: "hocine",
      subject: subject,
      message: message,
      reply_to: "joseph.g.jacks@gmail.com",
    })
    .then(
      function (response) {
        console.log("Email sent successfully!", response.status, response.text);
        checkbox.checked = !checkbox.checked;
        localStorage.setItem("emailSent", checkbox.checked);
      },
      function (error) {
        console.error("Failed to send email...", error);
      }
    );
}

// Function to update UI with fetched ratio and apply conditional styling
async function updateUI() {
  try {
    const ratio = await fetchRatio();

    if (ratio !== null) {
      const ratioElement = document.getElementById("ratioValue");
      ratioElement.textContent = `Current Ratio: ${ratio.toFixed(2)}`;

      if (!checkbox.checked) {
        // Apply conditional styling based on ratio value
        if (ratio <= 10.51) {
          ratioElement.style.backgroundColor = "red";
          ratioElement.style.color = "white"; // Optional: Change text color for better contrast
          sendEmail(
            "Sell EOS",
            `The current ratio is ${ratio.toFixed(2)}. Consider selling EOS.`
          );
        } else if (ratio >= 10.69) {
          ratioElement.style.backgroundColor = "green";
          ratioElement.style.color = "white"; // Optional: Change text color for better contrast
          sendEmail(
            "Sell AXS",
            `The current ratio is ${ratio.toFixed(2)}. Consider selling AXS.`
          );
        } else {
          ratioElement.style.backgroundColor = ""; // Reset background color if not in specified range
          ratioElement.style.color = ""; // Reset text color
        }
      } else {
        // Send an email if ratio is between 10.58 and 10.62
        if (ratio >= 10.58 && ratio <= 10.62) {
          sendEmail(
            "Take Profit",
            `The current ratio is ${ratio.toFixed(
              2
            )}. It's time to take profit.`
          );
        }
      }
    } else {
      const ratioElement = document.getElementById("ratioValue");
      ratioElement.textContent =
        "Failed to fetch ratio. Please try again later.";
      ratioElement.style.backgroundColor = ""; // Reset background color on error
      ratioElement.style.color = ""; // Reset text color on error
    }
  } catch (error) {
    console.error("Error updating UI:", error);
  }
}

// Call updateUI when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve checkbox state from localStorage
  const emailSent = JSON.parse(localStorage.getItem("emailSent"));
  checkbox.checked = emailSent || false;
  updateUI();
  // Update the ratio every 5 minutes (300,000 milliseconds)
  setInterval(updateUI, 60000);
});
