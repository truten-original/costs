import { useTheme } from '../../hooks'

const Header = () => {
  const { switchTheme, theme } = useTheme()
  return (
    <header
      className={`navbar navbar-dark bg-${
        theme === 'dark' ? 'dark' : 'primary'
      }`}
    >
      <h1 style={{ color: 'white' }}>Costs</h1>
      <button
        onClick={switchTheme}
        className={`btn btn-${theme === 'dark' ? 'light' : 'dark'}`}
      >
        {theme === 'dark' ? 'Go light' : 'Go dark'}
      </button>
    </header>
  )
}

export default Header
