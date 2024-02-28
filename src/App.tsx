import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>안뇽!</div>
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
