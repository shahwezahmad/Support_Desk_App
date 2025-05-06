import axios from "axios"

const API_URL = 'https://support-desk-app-gyct.onrender.com/api/tickets'
const getNotes =  async (ticketId, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/${ticketId}/notes`, config)
    return response.data
}


const addNotes = async ({ticketId, text},token) => {
    const config = {
        headers : {
            Authorization:  `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/${ticketId}/notes`, {text}, config)

    return response.data
}

const noteService = {
    getNotes,
    addNotes
}

export default noteService