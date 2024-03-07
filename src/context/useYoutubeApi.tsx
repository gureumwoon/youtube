import { useContext } from "react";
import { YoutubeApiContext } from "./YoutubeApiContext";

export function useYoutubeApi() {
    return useContext(YoutubeApiContext);
}