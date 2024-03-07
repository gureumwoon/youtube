import { ReactNode, createContext } from "react";
// import YoutubeApi from "../../api/YoutubeApi";
// import YoutubeClient from "../../api/YoutubeClient";
import FakeClient from "../../api/FakeClient";

export const YoutubeApiContext = createContext<FakeClient | null>(null);
const client = new FakeClient();
// const client = new YoutubeClient();
// const youtube = new YoutubeApi(client);

export function YoutubeApiProvider({ children }: { children: ReactNode }) {
    return (
        <YoutubeApiContext.Provider value={client}>
            {children}
        </YoutubeApiContext.Provider>
    )
}