import { render, screen, waitFor } from "@testing-library/react"
import { withAllContexts, withRouter } from "../../test/utils"
import { Route } from "react-router-dom"
import ChannelInfo from "../ChannelInfo"

describe('ChannelInfo', () => {
    const fakeYoutube = {
        channels: jest.fn()
    }

    afterEach(() => fakeYoutube.channels.mockReset());

    it('renders correctly', async () => {
        fakeYoutube.channels.mockImplementation(() => 'url');
        const { asFragment } = render(withAllContexts(
            withRouter(
                <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
            ),
            fakeYoutube
        ))
        await waitFor(() => screen.getByRole('img'));
        expect(asFragment()).toMatchSnapshot();
    });
})