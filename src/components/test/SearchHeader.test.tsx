import { render, screen } from "@testing-library/react"
import { withRouter } from "../../test/utils"
import { Route } from "react-router-dom"
import Header from "../Header"

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
});