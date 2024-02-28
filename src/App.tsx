import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Videos from "./pages/Videos"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Videos /> },
      { path: 'videos', element: <Videos /> },
      { path: 'videos/:searcWord', element: <Videos /> },
      { path: 'videos/watch/:videoId', element: <Videos /> }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
