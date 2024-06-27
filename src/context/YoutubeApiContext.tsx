import { createContext } from "react";
import YoutubeApi from "../../api/YoutubeApi";
// import FakeClient from "../../api/FakeClient";

export const YoutubeApiContext = createContext<YoutubeApi | null>(null);