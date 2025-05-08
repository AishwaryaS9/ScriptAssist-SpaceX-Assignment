import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { LaunchpadState } from '../utils/interface';

export interface LaunchDetails {
    name?: string;
    flight_number?: number;
    date_utc?: string;
    cores?: Array<{
        core: string;
        flight: number;
        reused: boolean;
        landing_attempt: boolean;
        landing_success: boolean;
    }>;
    links?: {
        patch?: {
            small?: string;
            large?: string;
        };
        article?: string;
        wikipedia?: string;
        youtube_id?: string;
    };
    details?: string;
    rocket?: string;
    launchpad?: string;
    success?: boolean;
}

export interface RocketState {
    rocketDetails: Record<string, any> | null;
    setRocketDetails: (details: Record<string, any>) => void;
    clearRocketDetails: () => void;
}

export interface AppState {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
    launchDetails: LaunchDetails | null;
    setLaunchDetails: (details: LaunchDetails) => void;
    clearLaunchDetails: () => void;
}

export const useAppStore = create<AppState>()(
    devtools(
        persist(
            (set) => ({
                token: null,
                setToken: (token) => set({ token }),
                logout: () => set({ token: null }),

                launchDetails: null,
                setLaunchDetails: (details) => set({ launchDetails: details }),
                clearLaunchDetails: () => set({ launchDetails: null }),
            }),
            {
                name: 'app-storage',
                getStorage: () => localStorage,
            }
        )
    )
);

export const useRocketStore = create<RocketState>()(
    devtools(
        persist(
            (set) => ({
                rocketDetails: null,
                setRocketDetails: (details) => set({ rocketDetails: details }),
                clearRocketDetails: () => set({ rocketDetails: null }),
            }),
            {
                name: 'rocket-storage',
                getStorage: () => localStorage,
            }
        )
    )
);

export const useLaunchpadStore = create<LaunchpadState>()(
    devtools(
        persist(
            (set) => ({
                launchpad: null,
                setLaunchpad: (data) => set({ launchpad: data }),
            }),
            {
                name: "launchpad-storage",
            }
        )
    )
);