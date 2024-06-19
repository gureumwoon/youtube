import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import VideoList from "../VideoList";
import { render, screen, waitFor } from "@testing-library/react";
import { convertDate } from "../../util/date";
import userEvent from "@testing-library/user-event";

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

    it('navigates to detailed video page with vid state when clicked', async () => {

        function LocationStateDisplay() {
            return <pre >{JSON.stringify(useLocation().state)}</pre>
        }

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/' element={<VideoList vid={video} />} />
                    <Route path={`/videos/watch/${video.id}`} element={<LocationStateDisplay />} />
                </Routes>
            </MemoryRouter>
        );

        const card = screen.getByRole('listitem');
        userEvent.click(card);

        await waitFor(() => {
            expect(screen.getByText(JSON.stringify({ vid: video }))).toBeInTheDocument();
        });

    })
})