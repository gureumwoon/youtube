import axios, { AxiosInstance } from "axios";

interface Item {
    id: {
        videoId: string;
    };
}

export default class YoutubeApi {
    private httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: "https://youtube.googleapis.com/youtube/v3",
            params: { key: import.meta.env.VITE_YOUTUBE_API_KEY }
        })
    }

    async search(keyword: string | null) {
        return keyword !== null ? this.#searchByKeyword(keyword) : this.#hotTrendVideo();
    }

    async #searchByKeyword(keyword: string) {
        return await this.httpClient.get('search', {
            params: {
                part: 'snippet',
                maxResults: 25,
                type: 'video',
                q: keyword
            }
        })
            .then((res) => res.data.items)
            .then((items: Item[]) => items.map((item) => ({ ...item, id: item.id.videoId })))
    }

    async #hotTrendVideo() {
        return axios.get('videos', {
            params: {
                part: 'snippet',
                maxResults: 25,
                chart: 'mostPopular',
                regionCode: 'KR'
            }
        })
            .then((res) => res.data.items);
    }
}