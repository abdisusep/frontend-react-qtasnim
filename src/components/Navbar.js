import React from 'react';
import { Link } from 'react-router-dom';
  
function Navbar (){
    return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm mb-3">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <img src="https://qtasnim.com/wp-content/uploads/2019/01/Logo-Qtasnim-Digital-Teknologi.png" alt="Logo Qtasnim" width="150"/>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item ps-2 pe-2">
                        <Link to="/" className="nav-link active">Home</Link>
                    </li>
                    <li className="nav-item ps-2 pe-2">
                        <Link to="/transaksi" className="nav-link active">Transaksi</Link>
                    </li>
                    <li className="nav-item ps-2 pe-2">
                        <Link to="/barang" className="nav-link active">Barang</Link>
                    </li>
                    <li className="nav-item ps-2 pe-2">
                        <Link to="/jenis_barang" className="nav-link active">Jenis Barang</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>)
}
  
export default Navbar;