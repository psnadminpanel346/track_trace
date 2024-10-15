// Import the functions you need from the SDKs you need
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

// Function to check the status of the redeem code
function checkStatus() {
    // Get the user input (redeem code)
    const redeemCode = document.getElementById('redeem-code').value;
    
    // Reference to the correct path of the redeem code in the database
    // The redeem code itself is the key, so we reference it directly
    const codeRef = ref(db, `${redeemCode}/status`);

    // Fetch the data from Firebase
    get(codeRef).then((snapshot) => {
        if (snapshot.exists()) {
            const status = snapshot.val();  // Since you're directly accessing 'status'
            console.log("Redeem code status:", status);
            
            // Hide all status messages
            document.getElementById('initiated').style.display = 'none';
            document.getElementById('processing').style.display = 'none';
            document.getElementById('completed').style.display = 'none';
            
            // Display the correct status message based on the value
            if (status === 0) {
                alert("Your Redeem code is not yet activited");
            } else if (status === 1) {
                document.getElementById('initiated').style.display = 'block';
            } else if (status === 2) {
                document.getElementById('processing').style.display = 'block';
            } else if (status === 3) {
                document.getElementById('completed').style.display = 'block';
            } else {
                alert("Unknown status value");
            }
        } else {
            alert("There is no record for this Redeem Code");
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
