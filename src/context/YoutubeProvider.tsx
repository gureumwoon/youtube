import { ReactNode } from "react";
import { YoutubeApiContext } from "./YoutubeApiContext";
import YoutubeClient from "../../api/YoutubeClient";
import YoutubeApi from "../../api/YoutubeApi";

// const client = new FakeClient();
const client = new YoutubeClient();
const youtube = new YoutubeApi(client);

export function YoutubeApiProvider({ children }: { children: ReactNode }) {
    return (
        <YoutubeApiContext.Provider value={youtube}>
            {children}
        </YoutubeApiContext.Provider>
    )
}