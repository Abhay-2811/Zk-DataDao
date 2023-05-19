import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import DAOs from './Pages/DAOs'
import Create from './Pages/Create'
import Navbar from './Components/Navbar'
import Profile from './Pages/Profile'
import '@rainbow-me/rainbowkit/styles.css'
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { filecoinHyperspace } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme
} from '@rainbow-me/rainbowkit'

function App () {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [filecoinHyperspace],
    [publicProvider()]
  )
  const { connectors } = getDefaultWallets({
    chains
  })

  const config = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient
  })
  return (
    <BrowserRouter>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          chains={chains}
          theme={midnightTheme({ accentColor: 'rgb(11, 83, 238)' })}
          coolMode
        >
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/daos' element={<DAOs />}></Route>
          <Route exact path='/createDao' element={<Create />}></Route>
          <Route exact path='/profile' element={<Profile />}></Route>
        </Routes>
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  )
}

export default App
