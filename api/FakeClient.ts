import axios, { AxiosResponse } from "axios";
import { YoutubeSearchApiResponseData } from "./YoutubeApi";

export default class FakeClient {

    async search() {
        return axios.get('http://localhost:5173/KeyWord.json')
            .then((res: AxiosResponse<YoutubeSearchApiResponseData>) => res.data.items
                .map((item) => ({ ...item, id: item.id.videoId })))
    }

    async videos() {
        return axios.get('http://localhost:5173/HotTrendVideo.json')
            .then((res: AxiosResponse) => res.data.items);
    }

    async channels() {
        return axios.get('http://localhost:5173/ChannelInfo.json')
            .then((res: AxiosResponse) => res.data.items[0].snippet.thumbnails.default.url);
    }

}