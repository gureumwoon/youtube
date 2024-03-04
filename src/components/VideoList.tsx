import { Video } from "../pages/Videos";

interface VideoListProps {
    vid: Video; // Video 인터페이스를 타입으로 지정
}

export default function VideoList({ vid }: VideoListProps) {

    return (
        <div>
            {vid.snippet.title}
        </div>
    )
}
