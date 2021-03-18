import { StoreProvider } from 'easy-peasy'
import store from './store'
import { loadConfigs } from './configs'
import Home from './pages/Home'
import './App.scss'

loadConfigs()

function App() {
  return (
    <StoreProvider store={store}>
      <Home />
    </StoreProvider>
  )
}

export default App
