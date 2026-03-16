import { createBrowserRouter, RouterProvider } from "react-router";
import AddLauncherPage from "./pages/AddLauncher"
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {index: true, element:<HomePage/>},
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
