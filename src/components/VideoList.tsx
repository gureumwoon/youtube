import { Video } from "../../api/YoutubeApi";


interface VideoListProps {
    vid: Video; // Video 인터페이스를 타입으로 지정
}

export default function VideoList({ vid }: VideoListProps) {

    const { title, thumbnails, channelTitle, publishedAt } = vid.snippet;

    return (
        <li>
            <img src={thumbnails.medium.url} alt={title} />
            <div>
                <p>{title}</p>
                <p>{channelTitle}</p>
                <p>{publishedAt}</p>
            </div>
        </li>
    )
}
