import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {getTicket, closeTicket} from '../features/tickets/ticketSlice'
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"


function Ticket () {
    const dispatch = useDispatch()
    const {ticket, isSuccess, isError, message, isLoading} = useSelector( states => states.ticket )
    const param = useParams()
    const navigate = useNavigate()

    const handleTicketClose = () => {
        dispatch(closeTicket(param.id)).then( res => {
            toast.success('Ticket closed.')
            navigate('/tickets')
        }).catch( error => {
            toast.error(error)
        })
    }


    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        dispatch(getTicket(param.id))
        

    }, [message, isError, param.id])

    if(isLoading) return <Spinner />
    if(isError) return <h3>Something Went Wrong</h3>
    return (
       <div className="ticket-page">
        <header className='ticket-header'>
        <BackButton />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.products}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

        {ticket.status !== 'closed' && (
            <button onClick={handleTicketClose} className="btn btn-block btn-danger"> Close ticket </button>
        )}
       </div>
    )
}

export default Ticket