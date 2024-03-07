import axios, { AxiosResponse } from "axios";

export default class FakeClient {

    async search() {
        return axios.get('http://localhost:5173/keyWord.json')
    }

    async videos() {
        return axios.get('http://localhost:5173/HotTrendVideo.json')
            .then((res: AxiosResponse) => res.data.items);
    }
}