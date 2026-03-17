import { createBrowserRouter, RouterProvider } from "react-router";
import AddLauncherPage from "./pages/AddLauncher"
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import DetailsLaunchePage from "./pages/DetailsLaunche";
import LoginPage from "./pages/LoginPage";
import AuthInit from "./comps/AuthInit";
import RegisterPage from "./pages/RegisterPage";


const router = createBrowserRouter([
  {path: '/login', element: <LoginPage/>},
  {
    path: '/',
    element: <Layout/>,
    children: [
      {index: true, element:<HomePage/>},
      {path: '/AddLauncher', element: <AddLauncherPage/>},
      {path: '/launcher/:id', element: <DetailsLaunchePage/>},
      {path: '/register', element: <RegisterPage/>}
      
    ]
  }
])

function App() {

  return (
    <>
    <AuthInit/>
  <RouterProvider router={router}/>
    </>
  )
}

export default App
