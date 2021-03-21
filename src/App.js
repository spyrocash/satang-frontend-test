// import { StoreProvider } from 'easy-peasy'
import { Provider } from 'react-redux'
// import store from './store'
import configureStore from './store2'
import { loadConfigs } from './configs'
import Home from './pages/Home'
import './App.scss'

loadConfigs()

const store = configureStore()

// function App() {
//   return (
//     <StoreProvider store={store}>
//       <Home />
//     </StoreProvider>
//   )
// }

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App
