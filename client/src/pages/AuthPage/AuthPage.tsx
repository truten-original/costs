import { FormEvent, MutableRefObject, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthClient } from '../../api/authClient'
import { Alert } from '../../types'
import Spinner from '../../components/Spinner/Spinner'

interface AuthPageProps {
  type: 'login' | 'registration'
}

const AuthPage = ({ type }: AuthPageProps) => {
  const [spinner, setSpinner] = useState(false)
  const [alert, setAlert] = useState<Alert>({
    alertText: '',
    alertStatus: 'succes',
  })
  const navigate = useNavigate()
  const loginRef = useRef() as MutableRefObject<HTMLInputElement>
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>
  const btnText = type === 'login' ? 'Войти' : 'Регистрация'
  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) return
    const result = await AuthClient.login(username, password)

    if (!result) {
      setSpinner(false)
      return
    }
    setSpinner(false)
    navigate('/costs', { replace: true })
    setAlert({ alertText: 'Вход выполнен', alertStatus: 'succes' })
  }
  const handleRegistration = async (username: string, password: string) => {
    if (!username || !password) return
    if (password.length < 4) return
    const result = AuthClient.registration(username, password)
    if (!result) {
      setSpinner(false)
      return
    }
    setSpinner(false)
    navigate('/login', { replace: true })
    setAlert({ alertText: 'Регистрация выполнена', alertStatus: 'succes' })
  }
  const handleAuth = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSpinner(true)
    switch (type) {
      case 'login':
        handleLogin(loginRef.current.value, passwordRef.current.value)
        break
      case 'registration':
        handleRegistration(loginRef.current.value, passwordRef.current.value)
        break

      default:
        break
    }
  }
  return (
    <div className="container mt-5">
      <h1>{type === 'login' ? 'Вход' : 'Регистрация'}</h1>
      <form className="form-group" onSubmit={(e) => handleAuth(e)}>
        <label htmlFor="email" className="auth-label">
          Почта
        </label>
        <input ref={loginRef} id="email" type="text" className="form-control" />
        <label htmlFor="password" className="auth-label">
          Пароль
        </label>
        <input
          ref={passwordRef}
          id="password"
          type="password"
          className="form-control"
        />
        <button className="btn btn-primary mt-2" type='submit'>
          {spinner ? <Spinner top={5} left={20} /> : btnText}
        </button>
      </form>
      <Link to={type === 'login' ? '/registration' : '/login'}>
        {type === 'login'
          ? 'Нет аккаунта? Зарегестрируйся'
          : 'Уже есть аккаунт? Войти'}
      </Link>
    </div>
  )
}

export default AuthPage
