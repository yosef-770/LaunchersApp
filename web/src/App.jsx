import { createBrowserRouter, RouterProvider } from "react-router";
import AddLauncherPage from "./pages/AddLauncher"
import Layout from "./pages/Layout";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {path: '/AddLauncher', element: <AddLauncherPage/>}
    ]

  }
])

function App() {

  return (
    <>
  <RouterProvider router={router}/>
    </>
  )
}

export default App
