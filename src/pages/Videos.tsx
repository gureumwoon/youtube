import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import VideoList from "../components/VideoList";
import { useYoutubeApi } from "../context/useYoutubeApi";
import { Video } from "../../api/YoutubeApi";

export default function Videos() {
    const { keyword } = useParams() as { keyword: string };
    const youtube = useYoutubeApi()
    const { isLoading, error, data: videos } = useQuery({
        queryKey: ['videos', keyword],
        queryFn: () => youtube?.videos()
    });

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something wrong...</p>}
            {videos && <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
                {
                    videos.map((vid: Video) => {
                        return <VideoList key={vid.id} vid={vid} />

                    })
                }
            </ul>}
        </>
    )
}
