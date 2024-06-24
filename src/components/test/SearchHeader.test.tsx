import { render, screen } from "@testing-library/react"
import { withRouter } from "../../test/utils"
import { Route } from "react-router-dom"
import Header from "../Header"
import userEvent from "@testing-library/user-event";

describe('SearchHeader', () => {
    it('renders correctly', () => {
        const { asFragment } = render(
            withRouter(<Route path="/" element={<Header />} />)
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with keyword correctly', () => {
        render(
            withRouter(<Route path="/:keyword" element={<Header />} />, '/seventeen')
        );

        expect(screen.getByDisplayValue('seventeen')).toBeInTheDocument();
    });

    it('navigates to results page on search button click', () => {
        const searchKeyword = 'fake-keyword';
        render(
            withRouter(
                <>
                    <Route path="/home" element={<Header />} />
                    <Route
                        path={`/videos/${searchKeyword}`}
                        element={<p>{`Search result for ${searchKeyword}`}</p>}
                    />
                </>,
                '/home'
            )
        );

        const searchButton = screen.getByRole('button');
        const searchInput = screen.getByRole('textbox');

        userEvent.type(searchInput, searchKeyword);
        userEvent.click(searchButton);

        expect(
            screen.getByText(`Search result for ${searchKeyword}`)
        ).toBeInTheDocument();
    });
});