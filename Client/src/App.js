import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import DAOs from './Pages/DAOs';
import Create from './Pages/Create';
import Navbar from './Components/Navbar';
import Profile from './Pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/daos' element={<DAOs />}></Route>
        <Route exact path='/createDao' element={<Create />}></Route>
        <Route exact path='/profile' element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
