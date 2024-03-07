import { Video } from "../../api/YoutubeApi";
import { convertDate } from "../util/date";

interface VideoListProps {
    vid: Video; // Video 인터페이스를 타입으로 지정
}

export default function VideoList({ vid }: VideoListProps) {

    const { title, thumbnails, channelTitle, publishedAt } = vid.snippet;

    return (
        <li>
            <img className='w-full' src={thumbnails.medium.url} alt={title} />
            <div>
                <p className="font-semibold my-2 line-clamp-2">{title}</p>
                <p className="text-sm opacity-80">{channelTitle}</p>
                <p className="text-sm opacity-80">{convertDate(publishedAt)}</p>
            </div>
        </li>
    )
}
