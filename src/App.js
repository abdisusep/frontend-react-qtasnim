import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from "./pages/Home";

import Barang from "./pages/barang";
import TambahBarang from "./pages/barang/add";
import EditBarang from "./pages/barang/edit";

import JenisBarang from "./pages/jenis_barang";
import TambahJenisBarang from "./pages/jenis_barang/add";
import EditJenisBarang from "./pages/jenis_barang/edit";

import Transaksi from "./pages/transaksi";
import TransaksiBarang from './pages/transaksi/add';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <Routes>
              <Route exact path='/' element={< Home />}></Route>
              <Route exact path='/barang' element={< Barang />}></Route>
              <Route exact path='/barang/tambah' element={< TambahBarang />}></Route>
              <Route exact path='/barang/edit/:id' element={< EditBarang />}></Route>
              <Route exact path='/jenis_barang' element={< JenisBarang />}></Route>
              <Route exact path='/jenis_barang/tambah' element={< TambahJenisBarang />}></Route>
              <Route exact path='/jenis_barang/edit/:id' element={< EditJenisBarang />}></Route>
              <Route exact path='/transaksi' element={< Transaksi />}></Route>
              <Route exact path='/transaksi/barang/:id' element={< TransaksiBarang />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
