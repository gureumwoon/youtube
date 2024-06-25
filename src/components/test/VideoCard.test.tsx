import { Route, useLocation } from "react-router-dom";
import VideoList from "../VideoList";
import { render, screen, waitFor } from "@testing-library/react";
import { convertDate } from "../../util/date";
import userEvent from "@testing-library/user-event";
import { fakeVideo as video } from "../../test/videos";
import { withRouter } from "../../test/utils";

describe('VideoCard', () => {

    const { thumbnails, title, channelTitle, publishedAt } = video.snippet;

    it('renders grid type correctly', () => {
        const { asFragment } = render(
            withRouter(<Route path="/" element={<VideoList vid={video} />} />)
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders list type correctly', () => {
        const { asFragment } = render(
            withRouter(<Route path="/" element={<VideoList vid={video} type="list" />} />)
        );
        expect(asFragment()).toMatchSnapshot();
    })


    it('renders video item', () => {
        render(
            withRouter(<Route path='/' element={<VideoList vid={video} />} />)
        )
        const image = screen.getByRole('img') as HTMLImageElement;
        expect(image.src).toBe(thumbnails.medium.url);
        expect(image.alt).toBe(title);
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(channelTitle)).toBeInTheDocument();
        expect(screen.getByText(convertDate(publishedAt))).toBeInTheDocument();
    });

    it('renders video item with missing publishedAt', () => {
        const videoWithoutPublishedAt = {
            ...video,
            snippet: {
                ...video.snippet,
                publishedAt: '',
            },
        };

        render(
            withRouter(<Route path='/' element={<VideoList vid={videoWithoutPublishedAt} />} />)
        );
        const image = screen.getByRole('img') as HTMLImageElement;
        expect(image.src).toBe(thumbnails.medium.url);
        expect(image.alt).toBe(title);
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(channelTitle)).toBeInTheDocument();
        expect(screen.getByText(convertDate(''))).toBeInTheDocument(); // Updated to match empty date
    });

    it('navigates to detailed video page with vid state when clicked', async () => {

        function LocationStateDisplay() {
            return <pre >{JSON.stringify(useLocation().state)}</pre>
        }

        render(
            withRouter(
                <>
                    <Route path='/' element={<VideoList vid={video} />} />
                    <Route path={`/videos/watch/${video.id}`} element={<LocationStateDisplay />} />
                </>
            )
        );

        const card = screen.getByRole('listitem');
        userEvent.click(card);

        await waitFor(() => {
            expect(screen.getByText(JSON.stringify({ vid: video }))).toBeInTheDocument();
        });

    });
})