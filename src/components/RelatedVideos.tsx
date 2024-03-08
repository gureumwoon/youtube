import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/useYoutubeApi";
import { ChannelInfoProps } from "./ChannelInfo";
import VideoList from "./VideoList";

export default function RelatedVideos({ id }: ChannelInfoProps) {
    const youtube = useYoutubeApi()
    const { error, isLoading, data: videos } = useQuery({
        queryKey: ['channelPlaylist', id],
        queryFn: () => youtube?.getChannelPlaylist(id)
    });
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something wrong...</p>}
            {videos && <ul>
                {
                    videos.map((vid) => {
                        return <VideoList key={vid.id} vid={vid} type='list' />

                    })
                }
            </ul>}
        </>
    )
}
