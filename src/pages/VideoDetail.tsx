import { useLocation } from "react-router-dom"
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideos from "../components/RelatedVideos";

export default function VideoDetail() {
    const { state: { vid } } = useLocation();
    const { title, channelId, channelTitle, description } = vid.snippet;
    return (
        <div className="flex flex-col lg:flex-row">
            <section className="basis-4/6">
                <iframe
                    id="player"
                    typeof="text/html"
                    width='100%'
                    height='640'
                    src={`https://www.youtube.com/embed/${vid.id}`}
                />
                <div className="p-8">
                    <p className="text-xl font-bold">{title}</p>
                    <ChannelInfo id={channelId} name={channelTitle} />
                    <pre className="whitespace-pre-wrap">{description}</pre>
                </div>
            </section>
            <section className="basis-2/6">
                <RelatedVideos id={channelId} />
            </section>
        </div>
    )
}
