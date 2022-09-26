import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams  } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8000/api/transaksi_barang";
  
function TransaksiBarang (){

    const [barang, setBarang] = useState([]);
    const [transaksi_barang, setTransaksiBarang] = useState([]);
    const [idBarang, setIdBarang] = useState('');
    const [qty, setQty] = useState('');
    const [harga, setHarga] = useState('');
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        document.title = 'Transaksi Barang';
        loadDataBarang();
        loadDataTransaksiBarang();
    },[]);

    const simpanTransaksiBarang = async (e) => {
        e.preventDefault();

        await axios.post(baseURL, {
            id_transaksi: id,
            id_barang: idBarang,
            harga: harga,
            qty: qty,
        })
        .then((res) => {
            setIdBarang('');
            setHarga('');
            setQty('');
            setTotal(total + (harga * qty))
            loadDataTransaksiBarang();
            loadDataBarang();
        })
        .catch((error) => {
            console.log(error)
        })
        
    }

    const loadDataBarang = () => {
        axios.get(`http://127.0.0.1:8000/api/barang?cari=&orderBy=asc`).then((response) => {
            setBarang(response.data.data)
        });
    }

    const loadDataTransaksiBarang = () => {
        axios.get(`${baseURL}/all/${id}`).then((response) => {
            setTransaksiBarang(response.data.data)
        });
    }

    const cekBarang = (id) => {
        axios.get(`http://127.0.0.1:8000/api/barang/${id}`).then((response) => {
            const data = response.data.data
            setIdBarang(data.id)
            setHarga(data.harga)
        });
    }

    const batalTransaksi = () => {
        axios.delete(`http://127.0.0.1:8000/api/transaksi/${id}`).then((response) => {
            navigate('/transaksi');
        });
    }

    const hapusTransaksiBarang = (idb) => {
        axios.get(`${baseURL}/detail/${idb}`).then((response) => {
            const data = response.data.data
            setTotal(total - (data.harga * data.qty))
        });
        axios.delete(`${baseURL}/delete/${idb}`).then((response) => {
            loadDataTransaksiBarang();
            loadDataBarang();
        });
    }

    const simpanTransaksi = () => {
        axios.put(`http://127.0.0.1:8000/api/transaksi/${id}`, {
            total: total,
        })
        .then((res) => {
            navigate('/transaksi');
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <h4>Transaksi Barang</h4>
            <button onClick={() => batalTransaksi()} className="btn btn-danger shadow-sm btn-sm mb-3">Batal</button>
            <form onSubmit={simpanTransaksiBarang}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Pilih Barang</label>
                    <div className="col-sm-5">
                        <select className="form-control" value={idBarang} onChange={(e) => cekBarang(e.target.value)} required={true}>
                            <option value="">--Pilih barang--</option>
                            {
                                barang.map((data, index) => {
                                    return(
                                        <option key={data.id} value={data.id}>{data.nama_barang} ({data.stok}) - Rp{data.harga}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Qty</label>
                    <div className="col-sm-5">
                        <input type="text" className="form-control" value={qty} onChange={(e) => setQty(e.target.value)} required={true}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="offset-sm-2">
                        <button type="submit" className="btn btn-dark me-2">Tambah</button>
                        <button onClick={() => simpanTransaksi()} className="btn btn-success">Simpan Transaksi</button>
                    </div>
                </div>
            </form>
                <table className="table table-bordered">
                    <thead>
                        <tr className="bg-light">
                            <th>Barang</th>
                            <th>Harga</th>
                            <th>Qty</th>
                            <th>Jumlah</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaksi_barang.map((data, index) => {
                            return(
                            <tr key={index}>
                                <td>{data.nama_barang}</td>
                                <td>Rp{data.harga}</td>
                                <td>{data.qty}</td>
                                <td>Rp{data.harga*data.qty}</td>
                                <td>
                                    <button onClick={() => hapusTransaksiBarang(data.id)} className="btn btn-sm btn-danger ms-1 me-1">x</button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <p>Rp{total}</p>
        </div>
    )
}
  
export default TransaksiBarang;