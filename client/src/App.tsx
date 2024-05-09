import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signin from './components/signin';
import Appbar from './components/Appbar';

function App() {

  return (
    <>
      <Router>
        <Appbar/>
        <Routes>
          <Route path='/' Component={Login}/>
          <Route path='signin' Component={Signin} />
        </Routes>
      </Router>
    </>
  )
}

export default App
