import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import VideoList from "../components/VideoList";
import { useYoutubeApi } from "../context/useYoutubeApi";
import { Video } from "../../api/YoutubeApi";

export default function Videos() {
    const { keyword } = useParams() as { keyword: string };
    console.log('키워드', keyword)
    const client = useYoutubeApi()
    console.log('유튜브', client?.search())
    const { isLoading, error, data: videos } = useQuery({
        queryKey: ['videos', keyword],
        queryFn: () => client?.videos()
    });

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something wrong...</p>}
            {videos && <ul>
                {
                    videos.map((vid: Video) => {
                        return <VideoList key={vid.id} vid={vid} />

                    })
                }
            </ul>}
        </>
    )
}
