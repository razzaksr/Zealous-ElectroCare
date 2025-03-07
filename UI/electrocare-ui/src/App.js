import React, { useEffect } from "react";
import { messaging } from "./base";  // Import messaging instance
import { getToken, onMessage } from "firebase/messaging";
import { NewBooking } from "./NewBooking";

const App = () => {
  useEffect(() => {
    // Request permission for notifications
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");
          // Get the FCM token
          const token = await getToken(messaging, {
            vapidKey: "KrhI1hki4PH7hn6UesdkBmHRwn4vwthhQpAMeSMJodA" // Get this from Firebase Console (Cloud Messaging settings)
          });
          console.log("FCM Token:", token);
          // Send this token to the backend to send notifications
        } else {
          console.log("Notification permission denied.");
        }
      } catch (error) {
        console.error("Error getting notification permission:", error);
      }
    };

    requestPermission();

    // Listen for foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);
      // Show notification manually
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
      });
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>Firebase Cloud Messaging is integrated!</p>
      <NewBooking/>
    </div>
  );
};

export default App;


// import { messaging } from "./base";
// import { useEffect } from "react";
// import axios from "axios";

// function App() {
//   useEffect(() => {
//     Notification.requestPermission()
//       .then((permission) => {
//         if (permission === "granted") {
//           messaging.getToken().then((token) => {
//             console.log("FCM Token:", token);
//             // Send FCM Token to backend
//             axios.post("http://localhost:8081/users/update-fcm-token", {
//               username: "razzaksr", // Replace with logged-in user's email
//               token: token,
//             });
//           });
//         }
//       });

//     messaging.onMessage((payload) => {
//       alert(`New Notification: ${payload.notification.title} - ${payload.notification.body}`);
//     });
//   }, []);

//   return <div className="App">Zealous ElectroCare 🚀</div>;
// }

// export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
