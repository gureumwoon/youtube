import { MemoryRouter } from "react-router-dom";
import VideoList from "../VideoList";
import { render, screen } from "@testing-library/react";
import { convertDate } from "../../util/date";

describe('VideoCard', () => {

    const video = {
        id: '1',
        snippet: {
            title: 'title',
            channelId: '1',
            thumbnails: {
                medium: {
                    url: 'http://image/',
                },
            },
            channelTitle: 'channelTitle',
            publishedAt: new Date().toString(),
        },
    };

    const { thumbnails, title, channelTitle, publishedAt } = video.snippet;

    it('renders video item', () => {
        render(
            <MemoryRouter>
                <VideoList vid={video} />
            </MemoryRouter>
        )
        const image = screen.getByRole('img') as HTMLImageElement;
        expect(image.src).toBe(thumbnails.medium.url);
        expect(image.alt).toBe(title);
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(channelTitle)).toBeInTheDocument();
        expect(screen.getByText(convertDate(publishedAt))).toBeInTheDocument();
    });

})