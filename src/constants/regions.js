import Constants from "expo-constants"

const domains = {
    "https://pokeapi.co/api/v2/region/1/": { name: "kanto", startId: 1, endId: 151 },
    "https://pokeapi.co/api/v2/region/2/": { name: "johto", startId: 152, endId: 251 },
    "https://pokeapi.co/api/v2/region/3/": { name: "hoenn", startId: 252, endId: 386 },
    "https://pokeapi.co/api/v2/region/4/": { name: "sinnoh", startId: 387, endId: 493 },
    "https://pokeapi.co/api/v2/region/5/": { name: "unova", startId: 494, endId: 649 },
    "https://pokeapi.co/api/v2/region/6/": { name: "kalos", startId: 650, endId: 721 },
    "https://pokeapi.co/api/v2/region/7/": { name: "alola", startId: 722, endId: 809 },
    "https://pokeapi.co/api/v2/region/8/": { name: "galar", startId: 810, endId: 898 },
    "https://pokeapi.co/api/v2/region/9/": { name: "hisui", startId: 899, endId: 905 },
}

export const Regions = {
    maxTeams: Constants.manifest.extra.teamsPerRegion || 2,
    domains,
}