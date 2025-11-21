"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

const AutoLogout = () => {
  const { data: session } = useSession();
  
  // Set timeout duration (e.g., 5 minutes = 300000ms)
  const TIMEOUT_MS = 30 * 60 * 1000; 

  useEffect(() => {
    // If user is not logged in, do nothing
    if (!session) return;

    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      // Clear existing timer
      if (timer) clearTimeout(timer);
      
      // Set new timer to log out
      timer = setTimeout(() => {
        // Optional: Add a confirmation modal here before signing out
        console.log("User inactive, logging out...");
        signOut({ callbackUrl: "/login" }); // Redirect to login page
      }, TIMEOUT_MS);
    };

    // Events to listen for activity
    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    // Setup event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Initialize timer on mount
    resetTimer();

    // Cleanup
    return () => {
      if (timer) clearTimeout(timer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [TIMEOUT_MS, session]);

  return null; // This component renders nothing
};

export default AutoLogout;