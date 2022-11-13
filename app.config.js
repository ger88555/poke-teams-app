import * as dotenv from "dotenv"

dotenv.config()

export default {
    expo: {
        name: "poke-teams-app",
        slug: "poke-teams-app",
        scheme: "pokeapp",
        owner: process.env.EXPO_USER || "ger88555",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./src/assets/images/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./src/assets/images/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [
            "./src/assets/**/*"
        ],
        ios: {
            bundleIdentifier: "com.ger88555.pokeapp",
            supportsTablet: true,
            infoPlist: {
                LSApplicationQueriesSchemes: ["pokeapp"]
            },
        },
        android: {
            package: "com.ger88555.pokeapp",
            adaptiveIcon: {
                foregroundImage: "./src/assets/images/adaptive-icon.png",
                backgroundColor: "#FFFFFF"
            },
            softwareKeyboardLayoutMode: "pan",
        },
        web: {
            favicon: "./src/assets/images/favicon.png"
        },
        facebookAppId: process.env.FIREBASE_AUTH_FACEBOOK_APP_ID,
        extra: {
            apiURL: process.env.API_URL,
            teamsPerRegion: process.env.TEAMS_PER_REGION,
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
            },
            eas: {
                projectId: "2771aba0-3426-4509-a892-5aa36af794dc"
            }
        },
    }
}
