import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom";
import VideoList from "../components/VideoList";

export interface Video {
    id: string;
    snippet: {
        title: string;
    };
}

export default function Videos() {
    const keyword = useParams();
    const { isLoading, error, data: videos } = useQuery({
        queryKey: ['videos', keyword],
        queryFn: async () => {
            return await axios.get(`http://localhost:5173/${keyword ? 'KeyWord' : 'HotTrendVideo'}.json`)
                .then((res) => {
                    console.log("비디오", res.data.items)
                    return res.data.items;
                });
        }
    });

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something wrong...</p>}
            {videos && <ul>
                {
                    videos.map((vid: Video) => <VideoList key={vid.id} vid={vid} />)
                }
            </ul>}
        </>
    )
}
