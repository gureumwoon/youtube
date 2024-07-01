import { Route } from "react-router-dom";
import { withAllContexts, withRouter } from "../../test/utils";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import RelatedVideos from "../RelatedVideos";
import { fakeVideos as videos } from "../../test/videos";

describe('RelatedVideos', () => {
    const fakeYoutube = {
        getChannelPlaylist: jest.fn()
    }

    afterEach(() => fakeYoutube.getChannelPlaylist.mockReset());

    it('renders correctly', async () => {
        fakeYoutube.getChannelPlaylist.mockImplementation(() => videos);
        const { asFragment } = rendersRelatedVideos()

        await waitForElementToBeRemoved(screen.getByText('Loading...'));
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders related videos correctly', async () => {
        fakeYoutube.getChannelPlaylist.mockImplementation(() => videos);
        rendersRelatedVideos()

        expect(fakeYoutube.getChannelPlaylist).toHaveBeenCalledWith('id');
        await waitFor(() => {
            expect(screen.getAllByRole('listitem')).toHaveLength(videos.length)
        });
    });

    it('renders loading', async () => {
        fakeYoutube.getChannelPlaylist.mockImplementation(() => videos);
        rendersRelatedVideos()

        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument()
        });
    });

    function rendersRelatedVideos() {
        return render(withAllContexts(
            withRouter(
                <Route path="/" element={<RelatedVideos id="id" />} />
            ),
            fakeYoutube
        ));
    }
})