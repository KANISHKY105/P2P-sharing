
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {


  return (

    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}>
      </Route>
      <Route path='/register' element={<RegisterPage/>}>
      </Route>
      {/* <Route path={`/register/${num}`} element={<RegisterPage/>}>
      </Route> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
