import Constants from "expo-constants"

/** @type {import("firebase/app").FirebaseOptions} */
const config = { ...Constants.manifest?.extra?.firebase?.config }

export const Firebase = { 
    config,
    clientIds: {
        google: Constants.manifest?.extra?.firebase?.googleClientId,
        facebook: Constants.manifest?.facebookAppId,
    }
}