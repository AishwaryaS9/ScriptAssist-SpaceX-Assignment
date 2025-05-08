import axios from "axios";
import { API_PATHS } from "./apiPaths";
import { useQuery } from "@tanstack/react-query";

export const useGetLaunches = () => {
    return useQuery(["launches"], async () => {
        const response = await axios.get(API_PATHS.RESOURCE_LIST.GET_ALL_LAUNCHES);
        return response.data;
    }, {
        onError: (error) => {
            console.error("Failed to fetch launches:", error);
        },
        retry: 3,
    });
};


export const useGetLaunchById = (id: string | number) => {
    return useQuery(["launch", id], async () => {
        const response = await axios.get(API_PATHS.RESOURCE_LIST.GET_LAUNCH_BY_ID(id));
        return response.data;
    }, {
        enabled: !!id,
        onError: (error) => {
            console.error(`Failed to fetch launch with id ${id}:`, error);
        },
    });
};


export const useEnrichLaunchData = (id: string) => {
    return useQuery(["rocketDetails", id], async () => {
        const response = await axios.get(API_PATHS.RESOURCE_LIST.GET_ENRICH_LAUNCH_DATA(id));
        return response.data;
    }, {
        enabled: !!id,
        onError: (error) => {
            console.error(`Failed to enrich data for launch with id ${id}:`, error);
        },
    });
};


export const fetchLaunchpadById = async (launchpadId: string) => {
    const response = await axios.post(API_PATHS.RESOURCE_LIST.QUERY_LAUNCHPAD_DETAILS, {

        query: { _id: launchpadId },
        options: {
            populate: [
                {
                    path: "launches",
                    select: { name: 1, date_local: 1 },
                    options: {
                        limit: 5,
                    },
                },
            ],
        },
    });
    return response.data.docs[0];
};

export const useGetLaunchpadById = (launchpadId: string | undefined) => {
    return useQuery(
        ["launchpad", launchpadId],
        () => fetchLaunchpadById(launchpadId!),
        {
            enabled: !!launchpadId,
            retry: 3,
            onError: (error) => {
                console.error(`Failed to fetch launchpad with id ${launchpadId}:`, error);
            },
        }
    );
};