import { useState,useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import {login} from '../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import {authSlice} from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  
  const {user, isError, isLoading, isSuccess, message} = useSelector( state => state.auth )

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
        email, password
    }

    dispatch(login(userData))

  };

  if(isLoading) {
    return  <Spinner />
  } 

  return (
    <>
      <section className="heading">
        <h1>
          {" "}
          <FaUser /> Login{" "}
        </h1>
        <p className="">Please Login</p>
      </section>

      <form onSubmit={onSubmit}>
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
          <button className="btn btn-block">Submit</button>
        </div>
      </form>
    </>
  );
}

export default Login;
