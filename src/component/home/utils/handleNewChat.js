const handleNewChat = ({
  setCurrentConversationTitle,
                         setCurrentChatId,
  setMessages,
  setInputText,
    setCurrentConversationTopic,
                         setLastUserInput
}) => {
  setCurrentConversationTitle("");
  setCurrentChatId(null);
  setMessages([]);
  setInputText("");
  setCurrentConversationTopic("")
    setLastUserInput("");
};
export default handleNewChat;
