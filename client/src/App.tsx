import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signin from './components/signin';
import Appbar from './components/Appbar';
import Users from './components/Users';
import sentFriendRequests from './components/sentfriendRequests';

function App() {

  return (
    <>
      <Router>
        <Appbar/>
        <Routes>
          <Route path='/' Component={Login}/>
          <Route path='signin' Component={Signin} />
          <Route path='/users' Component={Users}/>
          <Route path='/sent-friend-requests' Component={sentFriendRequests}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
