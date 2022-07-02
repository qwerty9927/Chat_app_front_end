import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cookie from 'js-cookie'
import './App.css';
import { selectState } from './components/features/auth/authSlice';
import LayoutAuth from './components/layouts/LayoutAuth'
import LayoutApp from './components/layouts/LayoutApp'
import Login from './components/ui/auth/Login'
import Resgister from './components/ui/auth/Resgister'
import AutoDirecte from './components/NotFound/AutoDirecte'

function App() {
  const stateAuth = useSelector(selectState)
  return (
    <Routes>
      {(JSON.parse(localStorage.getItem('auth')) || {}).isSuccess ?
        <Route path="/" element={<LayoutApp />}>
          <Route path="*" element={<AutoDirecte />}/>
        </Route>
      :
        <Route path="/" element={<LayoutAuth />} >
          <Route index element={<Login />} />
          <Route path="resgister" element={<Resgister />} />
          <Route path="*" element={<AutoDirecte />}/>
        </Route>
      }
    </Routes>
  )
  
}
export default App;
  