const baseURL = "https://api.spacexdata.com"

export const API_PATHS = {
    AUTH: {
        LOGIN: "https://spacex-backend-1rhs.onrender.com/api/auth/login"
    },
    RESOURCE_LIST: {
        GET_ALL_LAUNCHES: `${baseURL}/v4/launches`,
        GET_LAUNCH_BY_ID: (id: number | string) => `${baseURL}/v4/launches/${id}`,
        GET_ENRICH_LAUNCH_DATA: (id: number | string) => `${baseURL}/v4/rockets/${id}`,
        QUERY_LAUNCHPAD_DETAILS: `${baseURL}/v4/launchpads/query`
    },
}