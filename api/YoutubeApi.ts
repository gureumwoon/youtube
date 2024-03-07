import { AxiosResponse } from "axios";
import YoutubeClient from "./YoutubeClient";

interface SearchVideoProps {
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
        thumbnails: {
            medium: {
                url: string,
            };
        };
        channelTitle: string;
        publishedAt: string;
    };
}

interface YoutubeSearchApiResponseData {
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
        return keyword !== undefined ? this.#searchByKeyword(keyword) : this.#hotTrendVideo();
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
            .then((res: AxiosResponse<YoutubeSearchApiResponseData>) => res.data.items)
            .then((items: SearchVideoProps[]) => items.map((item) => ({ ...item, id: item.id.videoId })))
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