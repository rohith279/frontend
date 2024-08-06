import {getConversation} from "../../../Auth.js";
import {getAllTopics} from "../../../Api.js";

const handleButtonClick = async ({
  title,
    id,
  setMessages,
                                   setCurrentChatId,
  setInputText,
  scrollToBottom,
  setCurrentConversationTitle,
    setCurrentConversationTopic,
    user,
    setQuery,
                                     setLastUserInput
}) => {
  /*console.log("handleButtonClick");*/
  try {
    if (user) {
      const userId = user.uid;
/*      console.log("userId", userId);
      console.log("conversationId", id);*/
      const snapshot = await getConversation(userId, id);
        const topics = await getAllTopics();

/*      console.log("snapshot", snapshot);
      console.log("snapshot.messages", snapshot.messages);
      console.log("snapshot.topic", snapshot.topic);
      console.log("topics", topics);*/
      const thisPrompt = topics.find((topic) => topic.title === snapshot.topic).prompt;

/*        console.log("thisPrompt", thisPrompt);*/

          const newMessages = snapshot.messages;
          const lastUserinput = newMessages.find((message) => message.role === "user");
            const inputText = lastUserinput ? lastUserinput.content : "";
            // console.log("inputText", inputText);
            // console.log("lastUserinput", lastUserinput);
            setLastUserInput(inputText);
          setMessages(newMessages);
          setCurrentChatId(id);
          setCurrentConversationTitle(title);
            setCurrentConversationTopic(snapshot.topic);
            setQuery(thisPrompt);
          setInputText("");
          scrollToBottom();
    }
  } catch (error) {
    console.error("Error fetching conversation:", error);
  }
};


export default handleButtonClick;