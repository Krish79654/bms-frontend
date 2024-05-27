import axios from "axios";
import { useMyContext } from "../store/context";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

export default function EditProfile() {
    const { user, baseURL, authorizationToken, fetchUser } = useMyContext();
    const [updateData, setUpdateData] = useState({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
    })
    const handleChange = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.patch(baseURL + "/auth/user", updateData, {
            headers: {
                Authorization: authorizationToken
            }
        })
            .then((response) => {
                setUpdateData({
                    fullName: "",
                    email: "",
                    phone: "",
                });
                fetchUser();
                toast.success(response?.data?.message);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.error)
            })
    }
    return <div className='form-container' >
        <h2 className='my-4'>Edit profile</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-floating my-2">
                <input onChange={handleChange} name='fullName' value={updateData.fullName} id='fullName' type="text" className="form-control" placeholder='Full name' />
                <label htmlFor="fullName" className="form-label">Full name</label>
            </div>
            <div className="form-floating my-2">
                <input onChange={handleChange} name='email' value={updateData.email} id='email' type="email" className="form-control" placeholder='Email' />
                <label htmlFor="email" className="form-label">Email</label>
            </div>
            <div className="form-floating my-2">
                <input onChange={handleChange} name='phone' value={updateData.phone} id='phone' type="tel" className="form-control" placeholder='Phone' />
                <label htmlFor="phone" className="form-label">Phone</label>
            </div>
            <button className="btn btn-primary w-100">
                <i className="fa-solid fa-check me-2"></i>
                Save
            </button>
        </form>
    </div>;
}
