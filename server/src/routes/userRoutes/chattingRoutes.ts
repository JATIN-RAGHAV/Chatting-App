import express from "express";
import { User, Chat } from "../../db/schemas";
import authentication from "../authRoutes/authenticate";

const Router = express.Router();

Router.post("/send", authentication, async (req, res) => {
  // Expected body type {receiver: receiverUsername, message: message}
  const receiver: String = req.body.receiver;
  const message: String = req.body.message;
  const user = await User.findOne({
    username: req.body.serverData.user.username,
  });
  if (user) {
    const receiverObject = await User.findOne({ username: receiver });
    if (receiverObject) {
      if (user.friends.some((id) => id.equals(receiverObject._id))) {
        if (
          !user.chat.some((chats) => chats.with?.equals(receiverObject._id))
        ) {
          const newChatObjectContent = new Chat({
            chat: [{ sender: user._id, message }],
          });
          await newChatObjectContent.save();
          user.chat.push({
            chatId: newChatObjectContent._id,
            with: receiverObject._id,
          });
          receiverObject.chat.push({
            chatId: newChatObjectContent._id,
            with: user._id,
          });
          await user.save()
          await receiverObject.save()
          res.json({message: 'Message sent successfully'})
        } else {
          const chatId = user.chat.find((chat) =>
            chat.with?.equals(receiverObject._id)
          )?.chatId;
          const chatObject = await Chat.findById(chatId);
          if (chatObject) {
            chatObject.chat.push({ sender: user._id, message });
            await chatObject.save();
            res.json({ message: "Message sent successfully" });
          }else res.status(409).json({message: 'Could not send message'})
        }
      } else
        res
          .status(409)
          .json({ message: "Your are not friends with the other person" });
    } else res.status(404).json({ message: "Receiver not found" });
  } else res.status(404).json({ message: "User not found" });
});

Router.get("/get", authentication, async (req, res) => {
  // Expects a body {with: username of other person}
  const otherPerson: String = req.body.with;
  const user = await User.findOne({
    username: req.body.serverData.user.username,
  });
  if (user) {
    const other = await User.findOne({ username: otherPerson });
    if (other) {
      const chatId = user.chat.find((chat) => chat.with?.equals(other._id))?.chatId;
      if (chatId) {
        const chatObject = await Chat.findById(chatId);
        if (chatObject) {
           const chatToSend = chatObject.chat.map(chat => {
            return{
                sender:chat.sender?.equals(user._id)?user.username:other.username,
                message: chat.message
            }
        })
          res.json({ chat: chatToSend });
        } else res.status(404).json({ message: "Chat not found" });
      }else res.status(404).json({message: 'Chat not found, here'})
    }else res.status(404).json({message: 'Other user not found'})
  } else res.status(404).json({ message: "User not found" });
});

export default Router;