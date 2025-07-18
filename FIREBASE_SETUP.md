# Firebase Setup Guide

This guide will help you set up Firebase in your React application.

## Prerequisites

1. A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
2. Node.js and npm/yarn installed
3. Your React application (already set up)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "chamas-do-futuro-solda")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click "Create project"

## Step 2: Add Firebase to Your Web App

1. In your Firebase project console, click the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "chamas-do-futuro-solda-web")
3. You can check "Set up Firebase Hosting" if you plan to deploy there
4. Click "Register app"
5. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};
```

## Step 3: Set Up Environment Variables

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add your Firebase configuration values:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Important:** Replace the placeholder values with your actual Firebase configuration values.

## Step 4: Enable Authentication (Optional)

If you want to use Firebase Authentication:

1. In Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the authentication methods you want to use:
   - Email/Password (recommended for most apps)
   - Google (for Google sign-in)
   - Other providers as needed

## Step 5: Set Up Firestore Database (Optional)

If you want to use Firestore for data storage:

1. In Firebase Console, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location for your database
5. Click "Done"

## Step 6: Set Up Storage (Optional)

If you want to use Firebase Storage for file uploads:

1. In Firebase Console, go to "Storage" in the left sidebar
2. Click "Get started"
3. Choose "Start in test mode" for development
4. Select a location for your storage
5. Click "Done"

## Step 7: Test Your Setup

1. Start your development server: `npm run dev`
2. Check the browser console for any Firebase-related errors
3. Try using the authentication functions in your components

## Usage Examples

### Authentication

```tsx
import { useAuth } from "@/hooks/useAuth";
import { useFirebase } from "@/contexts/FirebaseContext";

function LoginComponent() {
  const { signIn, loading, error } = useAuth();
  const { user } = useFirebase();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      // Redirect or show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.displayName || user.email}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### Firestore Operations

```tsx
import { firestore, queryHelpers } from "@/lib/firestore";

// Create a document
const createUser = async (userData) => {
  const userId = await firestore.create("users", userData);
  return userId;
};

// Get a document
const getUser = async (userId) => {
  const user = await firestore.get("users", userId);
  return user;
};

// Query documents
const getActiveUsers = async () => {
  const users = await firestore.query("users", [
    queryHelpers.where("status", "==", "active"),
    queryHelpers.orderBy("createdAt", "desc"),
  ]);
  return users;
};
```

## Security Rules

Remember to set up proper security rules for Firestore and Storage in production:

### Firestore Rules Example

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Rules Example

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Troubleshooting

1. **Environment variables not loading**: Make sure your `.env` file is in the project root and variables start with `VITE_`
2. **Firebase not initialized**: Check that all environment variables are set correctly
3. **Authentication errors**: Verify that the authentication method is enabled in Firebase Console
4. **Permission denied**: Check your Firestore/Storage security rules

## Next Steps

- Set up proper security rules for production
- Implement user roles and permissions
- Add error handling and loading states
- Set up Firebase Hosting for deployment
- Configure Firebase Analytics if needed
