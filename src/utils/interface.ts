export interface ResourceList {
    height: {
        meters: number;
        feet: number;
    };
    diameter: {
        meters: number;
        feet: number;
    };
    mass: {
        kg: number;
        lb: number;
    };
    first_stage: {
        thrust_sea_level: {
            kN: number;
            lbf: number;
        };
        thrust_vacuum: {
            kN: number;
            lbf: number;
        };
        reusable: boolean;
        engines: number;
        fuel_amount_tons: number;
        burn_time_sec: number;
    };
    second_stage: {
        thrust: {
            kN: number;
            lbf: number;
        };
        payloads: {
            composite_fairing: {
                height: {
                    meters: number;
                    feet: number;
                };
                diameter: {
                    meters: number;
                    feet: number;
                };
            };
            option_1: string;
        };
        reusable: boolean;
        engines: number;
        fuel_amount_tons: number;
        burn_time_sec: number;
    };
    engines: {
        isp: {
            sea_level: number;
            vacuum: number;
        };
        thrust_sea_level: {
            kN: number;
            lbf: number;
        };
        thrust_vacuum: {
            kN: number;
            lbf: number;
        };
        number: number;
        type: string;
        version: string;
        layout: string;
        engine_loss_max: number;
        propellant_1: string;
        propellant_2: string;
        thrust_to_weight: number;
    };
    landing_legs: {
        number: number;
        material: string;
    };
    payload_weights: {
        id: string;
        name: string;
        kg: number;
        lb: number;
    }[];
    flickr_images: string[];
    name: string;
    type: string;
    active: boolean;
    stages: number;
    boosters: number;
    cost_per_launch: number;
    success_rate_pct: number;
    first_flight: string;
    country: string;
    company: string;
    wikipedia: string;
    description: string;
    id: string;
}

export type LaunchDetails = {
    fairings: {
        reused: boolean;
        recovery_attempt: boolean;
        recovered: boolean;
        ships: string[];
    };
    links: {
        patch: {
            small: string | null;
            large: string | null;
        };
        reddit: {
            campaign: string | null;
            launch: string | null;
            media: string | null;
            recovery: string | null;
        };
        flickr: {
            small: string[];
            original: string[];
        };
        presskit: string | null;
        webcast: string | null;
        youtube_id: string | null;
        article: string | null;
        wikipedia: string | null;
    };
    static_fire_date_utc: string | null;
    static_fire_date_unix: number | null;
    net: boolean;
    window: number | null;
    rocket: string | null;
    success: boolean | null;
    failures: {
        time: number;
        altitude: number | null;
        reason: string;
    }[];
    details: string | null;
    crew: string[];
    ships: string[];
    capsules: string[];
    payloads: string[];
    launchpad: string;
    flight_number: number;
    name: string;
    date_utc: string;
    date_unix: number;
    date_local: string;
    date_precision: "hour" | "day" | "month" | "year";
    upcoming: boolean;
    cores: {
        core: string;
        flight: number;
        gridfins: boolean;
        legs: boolean;
        reused: boolean;
        landing_attempt: boolean;
        landing_success: boolean | null;
        landing_type: string | null;
        landpad: string | null;
    }[];
    auto_update: boolean;
    tbd: boolean;
    launch_library_id: string | null;
    id: string;
};


export interface Resource {
    id: string;
    name: string;
    date_utc: string;
    success: boolean;
}
export interface ImageData {
    flickr_images: string[];
}

export interface PayloadWeights {
    id: string;
    name: string;
    kg: number;
    lb: number;

}

export interface LaunchPadImage {
    large: string[];
}


export interface LaunchpadState {
    launchpad: any | null;
    setLaunchpad: (data: any) => void;
}

export interface LaunchpadApiResponse {
    docs: Launchpad[];
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface Launchpad {
    images: LaunchpadImages;
    name: string;
    full_name: string;
    locality: string;
    region: string;
    latitude: number;
    longitude: number;
    launch_attempts: number;
    launch_successes: number;
    rockets: string[];
    timezone: string;
    launches: Launch[];
    status: string;
    details: string;
    id: string;
}

export interface LaunchpadImages {
    large: string[];
}

export interface Launch {
    name: string;
    date_local: string;
    id: string;
}
