import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import { AppStore, initializeStore } from "./store";
import { UserService } from "./services/user";
import { FirebaseItemsService } from "./services/items";

export function useInitializeApp() {
  // TODO handle errors
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [appStore, setAppStore] = useState<AppStore>();

  const initialize = async () => {
    const config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

    const firebaseApp = firebase.apps.length
      ? firebase.app()
      : firebase.initializeApp(config);

    await firebaseApp
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.NONE);

    const userService = new UserService(firebaseApp);
    const itemsService = new FirebaseItemsService(firebaseApp);
    const store = await initializeStore(userService, itemsService);
    setAppStore(store);
    setIsAppInitialized(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  return { isAppInitialized, appStore };
}
