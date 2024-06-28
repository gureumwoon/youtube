import { ReactNode } from "react";
import { MemoryRouter, Routes } from "react-router-dom";
import { YoutubeApiContext } from "../context/YoutubeApiContext";
import YoutubeApi from "../../api/YoutubeApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function withRouter(routes: ReactNode, initialEntry = '/') {
    return <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
            {routes}
        </Routes>
    </MemoryRouter>
}

interface PartialYoutubeApi {
    channels?: (id: string) => string;
    getChannelPlaylist?: (id: string) => string;
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