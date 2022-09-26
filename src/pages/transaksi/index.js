import React, { useState, useEffect }  from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8000/api/transaksi";

function Transaksi (){

    const [jenisbarang, setJenisbarang] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Transaksi';
        loadData('desc');
    },[]);

    const loadData = (fil) => {
        axios.get(`${baseURL}?orderByWaktu=${fil}`).then((response) => {
            setJenisbarang(response.data.data)
        });
    }

    const btnHapus = (id) => {
        axios.delete(`${baseURL}/${id}`).then((response) => {
            loadData('desc');
        });
    }

    const transaksiBaru = () => {
        axios.post(`${baseURL}`).then((response) => {
            const data = response.data.data
            navigate(`/transaksi/barang/${data.id}`);
        });
    }

    const filterTransaksi = (fil) => {
        loadData(fil);
    }


    return (
        <div>
            <h4>Data Transaksi</h4>
            <button onClick={() => transaksiBaru()} className="btn btn-light shadow-sm btn-sm mb-3">Transaksi baru</button>
            <form>
                <div className="row mb-3">
                    <div className="col-lg-4">
                        <select className="form-control" onChange={(e) => filterTransaksi(e.target.value)}>
                            <option value="desc">Urut transaksi terbaru</option>
                            <option value="asc">Urut transaksi terlama</option>
                        </select>
                    </div>
                </div>
            </form>
            <table className="table table-bordered">
                <thead>
                    <tr className="bg-light">
                        <th>#</th>
                        <th>Barang</th>
                        <th>Total</th>
                        <th>Waktu</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {jenisbarang.map((data, index) => {
                        return(
                        <tr key={index}>
                            <td>{index+1}.</td>
                            <td>
                            {
                                data.barang.map((brg) => {
                                    return(
                                        <p key={brg.id} className="m-0">- {brg.nama_barang} | Rp{brg.harga} * {brg.qty} : Rp{brg.harga*brg.qty}</p>
                                    )
                                })
                            }
                            </td>
                            <td>Rp{data.total}</td>
                            <td>{data.waktu}</td>
                            <td>
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
  
export default Transaksi;