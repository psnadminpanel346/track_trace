// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, get, ref } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjOqfK9295wCN3qDQmDfX7hlrpAVzWIxI",
  authDomain: "rdeem-code-453eb.firebaseapp.com",
  projectId: "rdeem-code-453eb",
  storageBucket: "rdeem-code-453eb.appspot.com",
  messagingSenderId: "923002610880",
  appId: "1:923002610880:web:c7710cc5b66bc9df2a7925"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("Firebase Database Initialized", db);

// Function to format timestamp to a readable date and time
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Convert to a readable date and time format
}

// Function to check the status of the redeem code
function checkStatus() {
    // Get the user input (redeem code) and remove any spaces (before, after, and in between)
    let redeemCode = document.getElementById('redeem-code').value.trim().replace(/\s+/g, '');

    if (!redeemCode) {
        alert("Please enter a valid redeem code.");
        return;
    }

    // Reference to the correct path of the redeem code in the database
    const codeRef = ref(db, redeemCode);

    // Fetch the data from Firebase (both status and lastUpdated fields)
    get(codeRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();  // Retrieve the entire redeem code object
            const status = data.status;
            const initiated = data.initiated;
            const processed = data.processed;
            const completed = data.completed;

            console.log("Redeem code status:", status, "Last Updated:", initiated);

            // Hide all status messages initially
            document.getElementById('initiated').style.display = 'none';
            document.getElementById('processing').style.display = 'none';
            document.getElementById('completed').style.display = 'none';

            // Get the formatted timestamp
            const initiatedDate = initiated ? formatTimestamp(initiated) : "N/A";
            const processeddate = processed ? formatTimestamp(processed) : "N/A";
            const completeddate = completed ? formatTimestamp(completed) : "N/A";

            // Update and display the correct status message based on the value
            if (status === 0) {
                alert("Your Redeem code is not yet activated.");
            } else if (status === 1) {
                document.getElementById('initiated').style.display = 'block';
                // Update the content within the initiated div (if necessary)
                document.querySelector('#initiated .active').innerHTML = `Initiated<br> (Your redeem code has been recieved at ${initiatedDate})`;
            } else if (status === 2) {
                document.querySelector('#processing .initiated').innerHTML = `Initiated<br> (Your redeem code has been recieved at ${initiatedDate})`;
                document.getElementById('processing').style.display = 'block';
                // Update the content within the processing div
                document.querySelector('#processing .active').innerHTML = `Processing<br>(The Supply Team has created your account at ${processeddate})`;
            } else if (status === 3) {
                
                document.querySelector('#completed .initiated').innerHTML = `Initiated<br> (Your redeem code has been recieved at ${initiatedDate})`;
                // Update the content within the processing div
                document.querySelector('#completed .processed').innerHTML = `Processing<br>(The Supply Team has created your account at ${processeddate})`;
                document.getElementById('completed').style.display = 'block';
                // Update the content within the completed div
                document.querySelector('#completed .active').innerHTML = `Completed<br>(Your order has been delivered at ${completeddate} check your mailbox, or <a href="https://drive.google.com/file/d/1JjR1KJMTz-elfRpZi5-FSEKDpIQUz2zt/view?usp=sharing">click here</a> to go to the activation guide.)`;
            } else {
                alert("Unknown status value.");
            }
        } else {
            alert("There is no record for this Redeem Code.");
        }
    }).catch((error) => {
        console.error("Error fetching data:", error);
        alert("Error retrieving data from database.");
    });
}

// Attach the function to the window object so it's globally available
window.checkStatus = checkStatus;




{/* <label for="redeem-code">Enter your Redeem Code:</label>
    <input type="text" id="redeem-code" placeholder="Enter code here">
    <button onclick="checkStatus()">Check Status</button>

    <div id="not-activated" class="status-message">Not activated yet</div>
    <div id="initiated" class="status-message">Initiated</div>
    <div id="processing" class="status-message">Processing</div>
    <div id="completed" class="status-message">Completed</div> */}
