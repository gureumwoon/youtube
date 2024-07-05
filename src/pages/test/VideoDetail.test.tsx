import { render, screen } from "@testing-library/react"
import { withRouter } from "../../test/utils"
import VideoDetail from "../VideoDetail"
import { Route } from "react-router-dom"
import { fakeVideo } from "../../test/videos"
import ChannelInfo from "../../components/ChannelInfo"
import RelatedVideos from "../../components/RelatedVideos"

jest.mock("../../components/ChannelInfo");
jest.mock("../../components/RelatedVideos");
const mockedChannelInfo = jest.mocked(ChannelInfo);
const mockedRelatedVideos = jest.mocked(RelatedVideos);

describe('VideoDetatil', () => {
    afterEach(() => {
        mockedChannelInfo.mockReset();
        mockedRelatedVideos.mockReset();
    });

    it('renders video detail', () => {
        render(
            withRouter(<Route path="/" element={<VideoDetail />} />, {
                pathname: '/',
                state: { vid: fakeVideo },
                key: 'fake-key',
            })
        )

        const { title, channelId, channelTitle } = fakeVideo.snippet;
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(mockedChannelInfo.mock.calls[0][0]).toStrictEqual({ id: channelId, name: channelTitle });
        expect(mockedRelatedVideos.mock.calls[0][0]).toStrictEqual({ id: channelId })

    });
})