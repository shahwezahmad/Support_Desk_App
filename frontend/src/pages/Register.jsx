import { useState, useEffect, use } from "react"
import { useNavigate } from "react-router-dom"
import {FaUser} from 'react-icons/fa'
import { toast } from "react-toastify"
import {useSelector, useDispatch} from 'react-redux'
import {register} from '../features/auth/authSlice'
import {authSlice} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"
function Register() {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const {name, email, password, password2} = formData
    const {user, isError, isSuccess, isLoading, message}  = useSelector( state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast(message)
        }

        // redirect to home
        if(user || isSuccess) {
            navigate('/')
        }


        dispatch(authSlice.actions.reset())

    },[isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData( (prev) => ({
            ...prev,
            [e.target.name]:e.target.value
        }) )
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2) {
            toast.error('password is not same..')
        }else {
            const userData = {
                name, email, password
            }
            dispatch(register(userData))
        }
    }

    if(isLoading) {
      return  <Spinner />
    } 
     
    return (
        <>
        <section className="heading">
            <h1> <FaUser /> Register </h1>
            <p className="">please create an account</p>
        </section>

        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                 type="text"
                 id="name"
                 name="name"
                 value={name}
                 className="form-control"
                 onChange={onChange}
                 placeholder="Enter you Name"
                />
            </div>
            <div className="form-group">
                <input
                 type="email"
                 id="email"
                 name="email"
                 value={email}
                 className="form-control"
                 onChange={onChange}
                 placeholder="Enter you email"
                />
            </div>
            <div className="form-group">
                <input
                 type="password"
                 id="password"
                 name="password"
                 value={password}
                 className="form-control"
                 onChange={onChange}
                 placeholder="Enter you password"
                />
            </div>
            <div className="form-group">
                <input
                 type="password"
                 id="password2"
                 name="password2"
                 value={password2}
                 className="form-control"
                 onChange={onChange}
                 placeholder="Confim Password"
                />
            </div>
            <div className="form-group">
                <button className="btn btn-block">
                    Submit
                </button>
            </div>
        </form>

        </>
    )
}

export default Register