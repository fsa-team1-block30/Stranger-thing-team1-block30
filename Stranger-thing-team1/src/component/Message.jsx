
import { useState } from 'react';
import { sendMessage } from '../API/index';

function Message() {
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const result = await sendMessage();
      if (result.success) {
        setMessageSuccess("Message sent successfully");
        setTimeout(() => {
          setMessageSuccess("");
        }, 5000);
      } else {
        console.error("Error sending message:", result.message);
      }
      setMessage(""); // Clear the input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message..."
        />
        <button type="submit">Send Message</button>
      </form>
      {messageSuccess && <p className="success-message">{messageSuccess}</p>}
    </div>
  );
}

export default Message;
