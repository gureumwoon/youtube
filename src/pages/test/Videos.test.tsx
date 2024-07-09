import { render, screen, waitFor } from "@testing-library/react";
import { fakeVideo, fakeVideos } from "../../test/videos";
import { withAllContexts, withRouter } from "../../test/utils";
import { Route } from "react-router-dom";
import Videos from "../Videos";

describe('Videos', () => {
    const fakeYoutube = {
        search: jest.fn(),
    };

    beforeEach(() => {
        fakeYoutube.search.mockImplementation((keyword) => {
            return keyword ? [fakeVideo] : fakeVideos;
        });
    });

    afterEach(() => {
        fakeYoutube.search.mockReset();
    });

    it('renders all videos when keyword is not specified', async () => {
        renderWithPath('/');

        expect(fakeYoutube.search).toHaveBeenCalledWith(undefined);
        await waitFor(() => {
            expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length);
        });
    });

    function renderWithPath(path = '/') {
        return render(
            withAllContexts(
                withRouter(
                    <>
                        <Route path="/" element={<Videos />} />
                        <Route path="/:keyword" element={<Videos />} />
                    </>,
                    path
                ),
                fakeYoutube
            )
        )
    }
})