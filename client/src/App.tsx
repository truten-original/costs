import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useStore } from 'effector-react'
import AuthPage from './pages/AuthPage/AuthPage'
import Header from './components/Header/Header'
import './App.css'
import Costs from './pages/Costs/Costs'
import { $auth } from './context/Auth'

function App() {
  const isLoggedIn = useStore($auth)
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Costs /> : <AuthPage type="login" />}
          />
          {isLoggedIn ? (
            <Route path="costs" element={<Costs />} />
          ) : (
            <>
              <Route path="login" element={<AuthPage type="login" />} />
              <Route
                path="registration"
                element={<AuthPage type="registration" />}
              />
            </>
          )}
          <Route
            path="*"
            element={isLoggedIn ? <Costs /> : <AuthPage type="login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
