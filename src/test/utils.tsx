import { ReactNode } from "react";
import { LocationDescriptorObject } from 'history';
import { MemoryRouter, Routes } from "react-router-dom";
import { YoutubeApiContext } from "../context/YoutubeApiContext";
import YoutubeApi from "../../api/YoutubeApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type InitialEntry = string | LocationDescriptorObject;

export function withRouter(routes: ReactNode, initialEntry: InitialEntry = '/') {
    return <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
            {routes}
        </Routes>
    </MemoryRouter>
}

interface PartialYoutubeApi {
    channels?: (id: string) => string;
    getChannelPlaylist?: (id: string) => string;
    search?: (keyword?: string) => string[];
}

export function withAllContexts(children: ReactNode, youtube: PartialYoutubeApi) {
    const testClient = createTestQueryClient();
    return <YoutubeApiContext.Provider value={youtube as unknown as YoutubeApi}>
        <QueryClientProvider client={testClient}>
            {children}
        </QueryClientProvider>
    </YoutubeApiContext.Provider>
}

function createTestQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        }
    })
}