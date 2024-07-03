var eoscheckbox = document.getElementById("eosemailSent");
var filcheckbox = document.getElementById("filemailSent");
// Retrieve checkbox state from localStorage
const eosemailSent = JSON.parse(localStorage.getItem("eosemailSent"));
eoscheckbox.checked = eosemailSent || false;

const filemailSent = JSON.parse(localStorage.getItem("filemailSent"));
filcheckbox.checked = filemailSent || false;

// Function to fetch ratio data
async function fetchRatio(route) {
  try {
    const response = await fetch(`http://localhost:3000/api/ratio/${route}`);
    const data = await response.json();
    return data.ratio;
  } catch (error) {
    console.error(`Error fetching ${route} ratio:`, error);
    return null;
  }
}

// Function to send an email using EmailJS
function sendEmail(subject, message, pair) {
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
        if (pair === "eso") {
          eoscheckbox.checked = !eoscheckbox.checked;
        } else {
          filcheckbox.checked = !filcheckbox.checked;
        }

        localStorage.setItem("emailSent", checkbox.checked);
      },
      function (error) {
        console.error("Failed to send email...", error);
        if (pair === "eso") {
          eoscheckbox.checked = !eoscheckbox.checked;
          localStorage.setItem("eosemailSent", eoscheckbox.checked);
        } else {
          filcheckbox.checked = !filcheckbox.checked;
          localStorage.setItem("filemailSent", filcheckbox.checked);
        }
      }
    );
}

// Function to update UI with fetched ratios and apply conditional styling
async function updateUI() {
  try {
    const ratioEOS = await fetchRatio("eos");
    const ratioFIL = await fetchRatio("fil");

    if (ratioEOS !== null) {
      const ratioEOSElement = document.getElementById("ratioValueEOS");
      ratioEOSElement.textContent = `Current EOS/AXS Ratio: ${ratioEOS.toFixed(
        2
      )}`;

      if (!eoscheckbox.checked) {
        // Apply conditional styling based on EOS ratio value
        if (ratioEOS <= 10.51) {
          ratioEOSElement.style.backgroundColor = "red";
          ratioEOSElement.style.color = "white"; // Optional: Change text color for better contrast
          sendEmail(
            "Sell EOS",
            `The current EOS ratio is ${ratioEOS.toFixed(
              2
            )}. Consider selling EOS and buying AXS.`,'eos'
          );
        } else if (ratioEOS >= 10.69) {
          ratioEOSElement.style.backgroundColor = "green";
          ratioEOSElement.style.color = "white"; // Optional: Change text color for better contrast
          sendEmail(
            "Sell AXS",
            `The current EOS ratio is ${ratioEOS.toFixed(
              2
            )}. Consider selling AXS and buying EOS.`,'eos'
          );
        } else {
          ratioEOSElement.style.backgroundColor = ""; // Reset background color if not in specified range
          ratioEOSElement.style.color = ""; // Reset text color
        }
      } else {
        // Send an email if ratio is between 10.58 and 10.62
        if (ratioEOS >= 10.58 && ratioEOS <= 10.62) {
          sendEmail(
            "Take Profit",
            `The current EOS ratio is ${ratioEOS.toFixed(
              2
            )}. It's time to take profit.`,'eos'
          );
        }
      }
    } else {
      const ratioEOSElement = document.getElementById("ratioValueEOS");
      ratioEOSElement.textContent =
        "Failed to fetch EOS ratio. Please try again later.";
      ratioEOSElement.style.backgroundColor = ""; // Reset background color on error
      ratioEOSElement.style.color = ""; // Reset text color on error
    }

    if (ratioFIL !== null) {
      const ratioFILElement = document.getElementById("ratioValueFIL");
      ratioFILElement.textContent = `Current FIL/AXS Ratio: ${ratioFIL.toFixed(
        2
      )}`;

      if (!filcheckbox.checked) {
        // Apply conditional styling based on FIL ratio value
        if (ratioFIL <= 1.33) {
          ratioFILElement.style.backgroundColor = "red";
          ratioFILElement.style.color = "white"; // Optional: Change text color for better contrast
          sendEmail(
            "Sell FIL",
            `The current FIL ratio is ${ratioFIL.toFixed(
              2
            )}. Consider selling FIL and buying AXS.`,'fil'
          );
        } else if (ratioFIL >= 1.40) {
          ratioFILElement.style.backgroundColor = "green";
          ratioFILElement.style.color = "white"; // Optional: Change text color for better contrast
          sendEmail(
            "Sell AXS",
            `The current FIL ratio is ${ratioFIL.toFixed(
              2
            )}. Consider selling AXS and buying FIL.`,'fil'
          );
        } else {
          ratioFILElement.style.backgroundColor = ""; // Reset background color if not in specified range
          ratioFILElement.style.color = ""; // Reset text color
        }
      } else {
        // Send an email if ratio is between 10.58 and 10.62
        if (ratioFIL >= 1.36 && ratioFIL <= 1.38) {
          sendEmail(
            "Take Profit",
            `The current FIL ratio is ${ratioFIL.toFixed(
              2
            )}. It's time to take profit.`,'fil'
          );
        }
      }
    } else {
      const ratioFILElement = document.getElementById("ratioValueFIL");
      ratioFILElement.textContent =
        "Failed to fetch FIL ratio. Please try again later.";
      ratioFILElement.style.backgroundColor = ""; // Reset background color on error
      ratioFILElement.style.color = ""; // Reset text color on error
    }
  } catch (error) {
    console.error("Error updating UI:", error);
  }
}

// Call updateUI when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve checkbox state from localStorage
  const eosemailSent = JSON.parse(localStorage.getItem("eosemailSent"));
  eoscheckbox.checked = eosemailSent || false;
  const filemailSent = JSON.parse(localStorage.getItem("filemailSent"));
  filcheckbox.checked = filemailSent || false;
  updateUI();
  // Update the ratio every 1 minutes (60,000 milliseconds)
  setInterval(updateUI, 60000);
});
