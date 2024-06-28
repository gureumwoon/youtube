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
        const { asFragment } = render(withAllContexts(
            withRouter(
                <Route path="/" element={<RelatedVideos id="id" />} />
            ),
            fakeYoutube
        ));

        await waitForElementToBeRemoved(screen.getByText('Loading...'));
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders related videos correctly', async () => {
        fakeYoutube.getChannelPlaylist.mockImplementation(() => videos);
        render(withAllContexts(
            withRouter(
                <Route path="/" element={<RelatedVideos id="id" />} />
            ),
            fakeYoutube
        ));

        expect(fakeYoutube.getChannelPlaylist).toHaveBeenCalledWith('id');
        await waitFor(() => {
            expect(screen.getAllByRole('listitem')).toHaveLength(videos.length)
        });
    });
})