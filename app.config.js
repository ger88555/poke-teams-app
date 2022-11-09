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
        extra: {
            apiURL: process.env.API_URL
        }
    }
}
