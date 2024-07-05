import { render } from "@testing-library/react"
import { withRouter } from "../../test/utils"
import { Route } from "react-router-dom"
import NotFound from "../NotFound"

describe('NotFound', () => {
    it('renders correctly', () => {
        const { asFragment } = render(withRouter(
            <Route path="/" element={<NotFound />} />
        ));

        expect(asFragment()).toMatchSnapshot();
    })
})