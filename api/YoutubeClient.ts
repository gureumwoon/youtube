import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class YoutubeClient {
    private httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: "https://youtube.googleapis.com/youtube/v3",
        })
    }

    async search(params: AxiosRequestConfig) {
        return this.httpClient.get('search', params);
    }

    async videos(params: AxiosRequestConfig) {
        return this.httpClient.get('videos', params);
    }
}