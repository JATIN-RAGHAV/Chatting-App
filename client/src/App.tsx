import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signin from './components/signin';
import Appbar from './components/Appbar';
import Users from './components/Users';
import sentFriendRequests from './components/sentfriendRequests';
import receivedFriendRequests from './components/receivedFriendRequests';
import Friends from './components/friends';
import Chat from './components/chat';
import { RecoilRoot } from 'recoil';

function App() {

  return (
    <>
      <RecoilRoot>
        <Router>
          <Appbar/>
            <Routes>
              <Route path='/' Component={Login}/>
              <Route path='signin' Component={Signin} />
              <Route path='/users' Component={Users}/>
              <Route path='/sent-friend-requests' Component={sentFriendRequests}/>
              <Route path='/received-friend-requests' Component={receivedFriendRequests}/>
              <Route path='/friends' Component={Friends}/>
              <Route path='/chat/:sender/:receiver' Component={Chat}/>
            </Routes>
        </Router>
      </RecoilRoot>
    </>
  )
}

export default App
