import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import VideoList from "../components/VideoList";
import YoutubeApi from "../../api/YoutubeApi";

export interface Video {
    id: string;
    snippet: {
        title: string;
    };
}

export default function Videos() {
    const { keyword } = useParams() as { keyword: string };
    const { isLoading, error, data: videos } = useQuery({
        queryKey: ['videos', keyword],
        queryFn: () => {
            const youtube = new YoutubeApi();
            return youtube.search(keyword);
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
