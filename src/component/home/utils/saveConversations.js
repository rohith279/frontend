import {createConversation, getConversation, getConversationTitles, updateConversation} from "../../../Auth.js";

const saveConversations = async ({
                                  setCurrentChatId,
  setConversationTitles,
                                   setConversationIds,
  newMessages,
  currentChatId,
    user,
    topic
}) => {
  if (user) {
    /*console.log("newMessages in saveConversations", newMessages);*/
    const userMessages = newMessages.filter((message) => message.role === "user");
    const title = newMessages.length > 0 ? userMessages[0].content : "Untitled";
    try {
      /*console.log("currentChatId", currentChatId);*/
      if (currentChatId) {
        const snapshot = await getConversation(user.uid, currentChatId);
        /*console.log("snapshot", snapshot);*/
        if (currentChatId && snapshot) {
          /*console.log("currentChatId", currentChatId);
          console.log("Update of snapshot", snapshot);*/
          await updateConversation(user.uid, currentChatId, title, newMessages);
        }
      }
      else {
        /*console.log("currentChatId does not exist", currentChatId);*/
        const res = await createConversation(user.uid, title, newMessages, topic);
        /*console.log("res", res);*/
            setCurrentChatId(res);

      }
      const updatedTitles = await getConversationTitles(user.uid);
      /*console.log("updatedTitles", updatedTitles);*/
        setConversationTitles(updatedTitles.titles);
        setConversationIds(updatedTitles.conversation_ids);


      /*console.log("Conversation saved successfully:", newMessages);*/
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  }
};

export default saveConversations;
