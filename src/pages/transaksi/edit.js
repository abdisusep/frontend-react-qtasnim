import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams  } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8000/api/jenis_barang";
  
function EditJenisBarang (){

    const [nama, setNama] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        document.title = 'Edit Jenis Barang';
        loadData();
    },[]);

    const loadData = () => {
        axios.get(`${baseURL}/${id}`).then((response) => {
            // console.log(response.data.data)
            const res = response.data.data
            setNama(res.nama_jenis_barang);
        });
    }

    const updateJenisBarang = async (e) => {
        e.preventDefault();

        await axios.post(baseURL, {
            nama_jenis_barang: nama,
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
            <h4>Edit Jenis Barang</h4>
            <Link to="/jenis_barang" className="btn btn-light shadow-sm btn-sm mb-3">Kembali</Link>
            <form onSubmit={updateJenisBarang}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Nama Jenis Barang</label>
                    <div className="col-sm-5">
                        <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} required={true}/>
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
  
export default EditJenisBarang;