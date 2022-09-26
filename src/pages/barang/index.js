import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const baseURL = "http://127.0.0.1:8000/api/barang";


  
function Barang (){
    const [cari, setCari] = useState('');
    const [order, setOrder] = useState('asc');
    const [barang, setBarang] = useState([]);
    

    useEffect(() => {
        document.title = 'Data Barang';
        loadData();
    },[]);

    const loadData = () => {
        axios.get(`${baseURL}?cari=${cari}&orderBy=${order}`).then((response) => {
            setBarang(response.data.data)
        });
    }

    const btnCari = (e) => {
        e.preventDefault();
        console.log('asd');
        axios.get(`${baseURL}?cari=${cari}&orderBy=${order}`).then((response) => {
            setBarang(response.data.data)
        });
    }

    const btnHapus = (id) => {
        axios.delete(`${baseURL}/${id}`).then((response) => {
            swal("Hapus!", "Berhasil hapus data!", "success");
            loadData();
        });
    }

    return (
        <div>
            <h4>Data Barang</h4>
            <Link to="/barang/tambah" className="btn btn-light shadow-sm btn-sm mb-3">Tambah</Link>
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
                        <th>Nama Barang</th>
                        <th>Stok</th>
                        <th>Harga</th>
                        <th>Jenis Barang</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {barang.map((data, index) => {
                        return(
                        <tr key={index}>
                            <td>{index+1}.</td>
                            <td>{data.nama_barang}</td>
                            <td>{data.stok}</td>
                            <td>{data.harga}</td>
                            <td>{data.jenis_barang}</td>
                            <td>
                                <Link to={`/barang/edit/`+data.id} className="btn btn-sm btn-primary ms-1 me-1">Edit</Link>
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
  
export default Barang;