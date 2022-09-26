import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate  } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8000/api/jenis_barang";
  
function TambahJenisBarang (){

    const [jenis, setJenis] = useState('');
    const navigate = useNavigate();

    const simpanJenisBarang = async (e) => {
        e.preventDefault();

        await axios.post(baseURL, {
            nama_jenis_barang: jenis,
        })
        .then((res) => {
            console.log(res)
            navigate('/jenis_barang');
        })
        .catch((error) => {
            console.log(error)
        })
        
        
    }

    return (
        <div>
            <h4>Tambah Jenis Barang</h4>
            <Link to="/jenis_barang" className="btn btn-light shadow-sm btn-sm mb-3">Kembali</Link>
            <form onSubmit={simpanJenisBarang}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Nama Jenis Barang</label>
                    <div className="col-sm-5">
                        <input type="text" className="form-control" value={jenis} onChange={(e) => setJenis(e.target.value)} required/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="offset-sm-2">
                        <button type="submit" className="btn btn-dark">Simpan</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
  
export default TambahJenisBarang;