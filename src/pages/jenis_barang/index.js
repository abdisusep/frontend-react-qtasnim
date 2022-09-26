import React, { useState, useEffect }  from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8000/api/jenis_barang";

function JenisBarang (){

    const [cari, setCari] = useState('');
    const [order, setOrder] = useState('asc');
    const [jenisbarang, setJenisbarang] = useState([]);

    useEffect(() => {
        document.title = 'Data Jenis Barang';
        loadData();
    },[]);

    const loadData = () => {
        axios.get(`${baseURL}?cari=${cari}&orderBy=${order}`).then((response) => {
            setJenisbarang(response.data.data)
        });
    }

    const btnCari = (e) => {
        e.preventDefault();
        console.log('asd');
        axios.get(`${baseURL}?cari=${cari}&orderBy=${order}`).then((response) => {
            setJenisbarang(response.data.data)
        });
    }

    const btnHapus = (id) => {
        axios.delete(`${baseURL}/${id}`).then((response) => {
            // console.log(response)
            loadData();
        });
    }


    return (
        <div>
            <h4>Jenis Barang</h4>
            <Link to="/jenis_barang/tambah" className="btn btn-light shadow-sm btn-sm mb-3">Tambah</Link>
            <form onSubmit={btnCari}>
                <div className="row mb-3">
                    <div className="col-lg-4">
                        <input type="text" className="form-control" value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Enter untuk cari..."/>
                    </div>
                </div>
            </form>
            <table className="table table-bordered">
                <thead>
                    <tr className="bg-light">
                        <th>#</th>
                        <th>Nama Jenis Barang</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {jenisbarang.map((data, index) => {
                        return(
                        <tr key={index}>
                            <td>{index+1}.</td>
                            <td>{data.nama_jenis_barang}</td>
                            <td>
                                <Link to={`/jenis_barang/edit/${data.id}`} className="btn btn-sm btn-primary ms-1 me-1">Edit</Link>
                                <button onClick={() => btnHapus(data.id)} className="btn btn-sm btn-danger ms-1 me-1">Hapus</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
  
export default JenisBarang;