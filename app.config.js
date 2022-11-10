import * as dotenv from "dotenv"

dotenv.config()

export default {
    expo: {
        name: "poke-teams-app",
        slug: "poke-teams-app",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./src/assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./src/assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./src/assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF"
            }
        },
        web: {
            favicon: "./src/assets/favicon.png"
        },
        facebookAppId: process.env.FIREBASE_AUTH_FACEBOOK_APP_ID,
        extra: {
            apiURL: process.env.API_URL,
            firebase: {
                googleClientId: process.env.FIREBASE_AUTH_GOOGLE_CLIENT_ID,
                config: {
                    appId: process.env.FIREBASE_APP_ID,
                    apiKey: process.env.FIREBASE_API_KEY,
                    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                    databaseURL: process.env.FIREBASE_DATABASE_URL,
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
                    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
                }
            }
        },
    }
}