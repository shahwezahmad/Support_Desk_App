const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200);
  res.json(ticket);
});

const deletTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await ticket.deleteOne();
  res.status(200).json({ success: true, message: "ticket deleted" });
});

const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const { description, status } = req.body;
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    {
      description,
      status,
    },
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

const createTicket = asyncHandler(async (req, res) => {
  const { products, description } = req.body;

  if (!products || !description) {
    res.status(400);
    throw new Error("Kindly fill all fields");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    products,
    description,
    status: "new",
  });

  if (ticket) {
    res.status(201);
    res.json({
      message: "Ticket has been created successfully",
      ticketId: ticket._id,
    });
  }
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deletTicket,
  updateTicket,
};
