import axios from "axios";

// package.json frontend proxy: 
// "proxy": "https://support-desk-app-gyct.onrender.com/",
// const API_URL = '/api/tickets'

const API_URL = "https://support-desk-app-gyct.onrender.com/api/tickets";

const createTicket = async (ticket, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticket, config);
  return response.data;
};

const getTickets = async (token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getTicket = async (ticketId, token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${ticketId}`, config);
  return response.data;
};

const closeTicket = async (ticketId, token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

    const response = await axios.put(`${API_URL}/${ticketId}`, {status: 'closed'}, config)
    return response.data

}

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket
};

export default ticketService;
