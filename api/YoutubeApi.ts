import { AxiosResponse } from "axios";
import YoutubeClient from "./YoutubeClient";

export interface SearchVideoProps {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
    };
}

export interface Video {
    id: string;
    snippet: {
        title: string;
        thumbnails?: {
            medium: {
                url: string,
            };
        };
        channelTitle?: string;
        publishedAt?: string;
    };
}

export interface YoutubeSearchApiResponseData {
    items: SearchVideoProps[]
}

interface YoutubeApiResponseData {
    items: Video[];
}

export default class YoutubeApi {
    private apiClient: YoutubeClient;

    constructor(apiClient: YoutubeClient) {
        this.apiClient = apiClient;
    }

    async search(keyword: string) {
        return keyword ? this.#searchByKeyword(keyword) : this.#hotTrendVideo();
    }

    async channels(id: string) {
        return this.apiClient.channels({ params: { part: 'snippet', id, key: import.meta.env.VITE_YOUTUBE_API_KEY } })
            .then((res) => res.data.items[0].snippet.thumbnails.default.url)
    }

    async getChannelPlaylist(id: string) {
        return this.apiClient.channelPlaylist({
            params: {
                part: 'snippet',
                channelId: id,
                maxResults: 25,
                order: 'date',
                type: 'video',
                key: import.meta.env.VITE_YOUTUBE_API_KEY
            }
        })
            .then((res: AxiosResponse<YoutubeSearchApiResponseData>) => res.data.items
                .map((item) => ({ ...item, id: item.id.videoId }))
            )
    }

    async #searchByKeyword(keyword: string) {
        return this.apiClient.search({
            params: {
                part: 'snippet',
                maxResults: 25,
                type: 'video',
                q: keyword,
                key: import.meta.env.VITE_YOUTUBE_API_KEY
            }
        })
            .then((res: AxiosResponse<YoutubeSearchApiResponseData>) => res.data.items
                .map((item) => ({ ...item, id: item.id.videoId })))
    }

    async #hotTrendVideo() {
        return this.apiClient.videos({
            params: {
                part: 'snippet',
                maxResults: 25,
                chart: 'mostPopular',
                regionCode: 'KR',
                key: import.meta.env.VITE_YOUTUBE_API_KEY
            }
        })
            .then((res: AxiosResponse<YoutubeApiResponseData>) => res.data.items);
    }
}