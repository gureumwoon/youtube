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
        const { asFragment } = renderChannelInfo();

        await waitFor(() => screen.getByRole('img'));
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders without URL', () => {
        fakeYoutube.channels.mockImplementation(() => {
            throw new Error('error');
        });
        renderChannelInfo();

        expect(screen.queryByRole('img')).toBeNull();
    });

    // 위 snapshot테스트와 중복이 되어서 생략해도 가능하지만, 좀 더 명시적으로 나타내고 싶다면 테스트 추가해도 괜찮. 
    it('renders with URL', async () => {
        fakeYoutube.channels.mockImplementation(() => 'url');
        renderChannelInfo()

        await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());
    });

    function renderChannelInfo() {
        return render(withAllContexts(
            withRouter(
                <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
            ),
            fakeYoutube
        ));
    }
})