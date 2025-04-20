import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import { toast } from "react-toastify"
import Spinner from '../components/Spinner'
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem"

function Tickets () {
    let {tickets, isLoading , isError, isSuccess,message} = useSelector( states => states.ticket )
    tickets =  [
        {
            "_id": "67f7769e911525c8e51b450d",
            "user": "67f7768d911525c8e51b4509",
            "products": "iPhone",
            "description": "testing quickly",
            "status": "new",
            "createdAt": "2025-04-10T07:43:26.716Z",
            "updatedAt": "2025-04-10T07:43:26.716Z",
            "__v": 0
        }
    ]
    
    const dispatch = useDispatch()

    useEffect(() => {
        if(isSuccess) {
            return () => {
                dispatch(reset())
            }
        }
        
    },[dispatch,isSuccess])

    useEffect(() => {
        dispatch(getTickets())
        if(isError) {
            toast.error(message)
        }
        
    },[message, dispatch, isError, message])
 return (
    <>
    <BackButton url='/' />
    <h1>Tickets</h1>
    <div className="tickets">
        <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
        </div>
        {tickets && tickets.length > 0 ? ( 
            <>
                {tickets.map( (ticket) => <TicketItem key={ticket._id} ticket={ticket} />  ) }
            </>
            
        ) : (<>No ticket found</>)  }
    </div>
       
    </>
 )
}

export default Tickets