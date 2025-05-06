import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import Modal from 'react-modal'
import {getTicket, closeTicket} from '../features/tickets/ticketSlice'
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import { addNote, getNotes, reset as NoteReset } from "../features/notes/noteSlice"
import NoteItem from "../components/NoteItem"
import { FaPlus } from "react-icons/fa"

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')
function Ticket () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
    const dispatch = useDispatch()
    const {ticket, isSuccess, isError, message, isLoading} = useSelector( states => states.ticket )
    const {notes, isLoading: noteLoading} = useSelector( states => states.notes )
    const param = useParams()
    const navigate = useNavigate()

    const handleTicketClose = () => {
        dispatch(closeTicket(param.id)).unwrap().then(() => {
          navigate('/tickets')
          toast.success('Ticket closed.')

        }).catch(toast.error)
      }

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        dispatch(getTicket(param.id))
        dispatch(getNotes(param.id))
        

    }, [message, isError, param.id])

    const OpenModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const onNoteSubmit = (e) => {
      e.preventDefault()
      dispatch(addNote({ticketId: param.id, text: noteText})).unwrap().then( () => {
        setNoteText('')
        closeModal()
      }).catch(error => toast.error(error))
    }



    if(isLoading) return <Spinner />
    if(isError) return <h3>Something Went Wrong</h3>
    return (
       <div className="ticket-page">
        <header className='ticket-header'>
        <BackButton url='/tickets' />
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
      {ticket.status !== 'closed'  && (
        <button className="btn" onClick={OpenModal}> <FaPlus /> Add Note</button>
      )}

      <Modal isOpen = {isModalOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add note">
      <h2>Add Note</h2>
      <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea value={noteText} 
             name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
               onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit"> 
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem  key = {note?._id} note = {note} />
      ))}

        {ticket.status !== 'closed' && (
            <button onClick={handleTicketClose} className="btn btn-block btn-danger"> Close ticket </button>
        )}
       </div>
    )
}

export default Ticket