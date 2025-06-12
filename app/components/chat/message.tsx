interface ChatMessageProps {
  chat: {
    role: string;
    content: string;
    isError: boolean;
    hideInChat?: boolean;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chat }) => {
  //   console.log("chat message", chat);
  return (
    !chat.hideInChat && ( // Check if hideInChat is not true
      <div className={`message-cont ${chat.role === "model" ? "bot" : "user"}`}>
        {chat.role === "model" && (
          <div className={`${chat.role === "model" ? "bot" : "user"}-icon`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#0a1763"
            >
              <path d="M160-120v-200q0-33 23.5-56.5T240-400h480q33 0 56.5 23.5T800-320v200H160Zm200-320q-83 0-141.5-58.5T160-640q0-83 58.5-141.5T360-840h240q83 0 141.5 58.5T800-640q0 83-58.5 141.5T600-440H360ZM240-200h480v-120H240v120Zm120-320h240q50 0 85-35t35-85q0-50-35-85t-85-35H360q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0-80q17 0 28.5-11.5T400-640q0-17-11.5-28.5T360-680q-17 0-28.5 11.5T320-640q0 17 11.5 28.5T360-600Zm240 0q17 0 28.5-11.5T640-640q0-17-11.5-28.5T600-680q-17 0-28.5 11.5T560-640q0 17 11.5 28.5T600-600ZM480-200Zm0-440Z" />
            </svg>
          </div>
        )}
        <div
          className={`chat-message ${chat.role === "model" ? "bot" : "user"} ${
            chat.isError ? "error" : ""
          }`}
        >
          <p>{chat.content}</p>
        </div>
        {/* {chat.role != "model" && (
        <div className={`${chat.role === "model" ? "bot" : "user"}-icon`}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        viewBox="0 -960 960 960"
        width="30px"
        fill="#0a1763"
        >
        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
        </svg>
        </div>
        )} */}
      </div>
    )
  );
};

export default ChatMessage;
