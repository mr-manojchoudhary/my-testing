import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home"; // Import the Home component
import Login from "./components/Login";
import Register from "./components/Register";
import AddQuiz from "./pages/AddQuiz";
import Play from "./pages/Play";
// import ViewQuiz from "./pages/ViewQuiz";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AddQuize from "./pages/AddQuiz";
import ViewQuiz from "./pages/ViewQuiz";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkO2uxSzSBwX7jxvJFruxtcGEmSnKaRhQ",
  authDomain: "wsjp-61-ed096.firebaseapp.com",
  databaseURL: "https://wsjp-61-ed096-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wsjp-61-ed096",
  storageBucket: "wsjp-61-ed096.firebasestorage.app",
  messagingSenderId: "260547699290",
  appId: "1:260547699290:web:800da2dfee120012ac6e63",
  measurementId: "G-QXY52BG461"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />, // Use the imported Home component
        },
        {
          path: "/add-quiz",
          element: <AddQuiz />
        },
        {
          path: "/View-quiz",
          element: <ViewQuiz />
        },
        {
          path: "/play",
          element: <Play />
        },

      ],
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);
  return (
         <RouterProvider router={router} />
  )
}
