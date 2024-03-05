import axios from "axios";

interface Item {
    id: {
        videoId: string;
    };
}

export default class FakeApi {
    constructor() {

    }

    async search(keyword: string) {
        return keyword ? this.#searchByKeyword() : this.#hotTrendVideo();
    }

    async #searchByKeyword() {
        return axios.get('http://localhost:5173/keyWord.json')
            .then((res) => res.data.items)
            .then((items: Item[]) => items.map((item) => ({ ...item, id: item.id.videoId })))
    }

    async #hotTrendVideo() {
        return axios.get('http://localhost:5173/HotTrendVideo.json')
            .then((res) => res.data.items);
    }
}