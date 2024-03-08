import { useNavigate } from "react-router-dom";
import { Video } from "../../api/YoutubeApi";
import { convertDate } from "../util/date";

interface VideoListProps {
    vid: Video; // Video 인터페이스를 타입으로 지정
    type?: string;
}

export default function VideoList({ vid, type }: VideoListProps) {
    const navigate = useNavigate();
    const isList = type === 'list';
    const { title, thumbnails, channelTitle, publishedAt } = vid.snippet;

    return (
        <li
            className={isList ? 'flex gap-1 m-2' : ''}
            onClick={() => navigate(`/videos/watch/${vid.id}`, { state: { vid } })}
        >
            <img className={isList ? 'w-60 mr-2' : 'w-full'} src={thumbnails?.medium.url} alt={title} />
            <div>
                <p className="font-semibold my-2 line-clamp-2">{title}</p>
                <p className="text-sm opacity-80">{channelTitle}</p>
                <p className="text-sm opacity-80">{convertDate(publishedAt || '')}</p>
            </div>
        </li>
    )
}
