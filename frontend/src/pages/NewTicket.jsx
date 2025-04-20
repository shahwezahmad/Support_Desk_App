import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket } from "../features/tickets/ticketSlice";
import {reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const {tickets, ticket, isError, isSuccess, message, isLoading} = useSelector(state => state.ticket)
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [products, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");
  const navigate = useNavigate()


  useEffect(() => {
    if(isError) {
        toast(message)
    }

    if(isSuccess) {
        navigate('/')
        dispatch(reset())
    }
    dispatch(reset())

  },[isError,navigate, dispatch,isSuccess, message])

  const onSubmit = (e) => {
    e.preventDefault()

    if(!products || !description) {
        toast('Kindly fill required field')
    }

    dispatch(createTicket({products,description}))
  }


  if(isLoading) return <Spinner />

  return (
    <>
    <BackButton url = '/' />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out form below.</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            name="name"
            value={name}
            id="name"
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input
            type="email"
            name="name"
            value={email}
            id="email"
            className="form-control"
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Select Product<sup>*</sup></label>
            <select
              name="products"
              id="products"
              value={products}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone"> iPhone </option>
              <option value="iMac"> iMac </option>
              <option value="iPad"> iPad </option>
              <option value="Macbook Pro">Macbook Pro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Description of the issue<sup>*</sup></label>
            <textarea
              name="name"
              value={description}
              id="email"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
            ></textarea>
          </div>
          <div className="form-group">
                    <button className="btn btn-block">Submit</button>
        </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
