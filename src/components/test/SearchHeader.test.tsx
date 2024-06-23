import { render } from "@testing-library/react"
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
});