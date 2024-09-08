export default {
  // Server domain
  serverDomain: import.meta.env.VITE_SERVER_DOMAIN,

  // Firebase Auth
  apiKey: import.meta.env.VITE_API_KEY || "",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

/**
 * must variable names start with VITE otherwise it wont work
 * of course not all setup like this, you can specify prefix for variable names if you want
 */
