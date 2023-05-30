import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    JSON.parse(localStorage.getItem('theme') as string) || 'dark'
  )
  const darkTheme =
    'https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css'
  const lightTheme =
    'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css'
  const switchTheme = () => {
    const inverseMode = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', JSON.stringify(inverseMode))
    setTheme(inverseMode)
  }
  useEffect(() => {
    const link = document.getElementById('theme-link') as HTMLLinkElement
    link.href = theme === 'dark' ? darkTheme : lightTheme
  }, [theme])
  return {
    switchTheme,
    theme,
  }
}

export const useLogout = () => {
  const navigate = useNavigate()
  navigate('logout', {replace: true})
}
