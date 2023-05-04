
import './App.css';
import AllUsers from './components/AllUsers';
import RegistrationForm from './components/RegistrationForm';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import RootLayout from './components/RootLayout';

function App() {

  const router = createBrowserRouter([{
    path:"/",
    element:<RootLayout/>,
    children:[
      {path:"/",element:<RegistrationForm/>},
      {path:"/showUsers",element:<AllUsers/>}
    ]
  }])

  return (
    <RouterProvider router={router}/>


  );
}

export default App;
