import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "../context/useYoutubeApi"

export interface ChannelInfoProps {
    id: string;
    name?: string;
}

export default function ChannelInfo({ id, name }: ChannelInfoProps) {
    const youtube = useYoutubeApi();
    const { data: url } = useQuery({
        queryKey: ['channel', id],
        queryFn: () => youtube?.channels(id)
    })

    return (
        <div className="flex my-4 mb-8 items-center">
            {url && <img className='w-10 h-10 rounded-full' src={url} alt={name} />}
            <p className="text-lg font-medium ml-2">{name}</p>
        </div>
    )
}
