import saveConversations from "./saveConversations";
import {BOT_ROLE, SYSTEM_ROLE, USER_ROLE} from "../../../consts.js";
import {replaceAll, replaceDoubleSpace, replaceNumbers} from "./replaceNumbers.js";
import axios from "axios";

const getChatResponse = async ({
  setIsLoading,
  setMessages,
                                 currentConversationTopic,
  setInputText,
  setCurrentConversationTitle,
                                 setCurrentChatId,
                                 currentChatId,
  setConversationTitles,
                                 setConversationIds,
  apiKey,
  query,
  inputText,
  apiUrl,
  messages,
    user,
    setLastUserInput
}) => {
  try {
    setIsLoading(true);

    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              'do not add numbers to list if it is a list add this "\\n" to each item instead of numbers as separator between elements' +
              query +
              inputText,
          },
        ],
        max_tokens: 2048,
        temperature: 0.2,
        n: 1,
        stop: null,
      }),
    };

    const content =
        'Don not ask for any followup questions, just give list of answer or answers. ' +
        query +
        inputText;

    const response = await axios.get(apiUrl + content);

    const data = await response.data;
    const botMessage = data.response;
    let newMessages = [
      ...messages,
      { role: SYSTEM_ROLE, content: "generate more" },
      { role: USER_ROLE, content: inputText},
        { role: BOT_ROLE, content: botMessage }
    ]
    if (currentConversationTopic !== "Content") {
      let list = botMessage.split("\n") ?? {
        role: BOT_ROLE,
        content: botMessage,
      };

      /*console.log("botMessage", botMessage);*/
      list = replaceAll(list);
      /*console.log("list before", list);*/
      list = list.map((item) => {
        const content = item.trim();
        if (content === "") return;
        return {role: BOT_ROLE, content: item.trim()};
      });
      /*console.log("list after", list);*/
      if (list.length === 0) {
        list.push({
          role: "bot",
          content: botMessage,
        });
      }
      newMessages = [
        ...messages,
        { role: SYSTEM_ROLE, content: "generate more" },
        { role: USER_ROLE, content: inputText},
        ...list
      ];
    }
    /*console.log("newMessages getChatResponse", newMessages);*/
    setMessages(newMessages);
    setLastUserInput(inputText);
    // console.log("lastUserInput", inputText);
    setInputText("");
    if (messages.length <= 1) setCurrentConversationTitle(inputText);
    /*console.log("newMessages getChatResponse", newMessages);*/
    await saveConversations({
        setCurrentChatId,
      setConversationTitles,
      setConversationIds,
        newMessages,
        currentChatId,
        user,
          topic: currentConversationTopic
        });
  } catch (error) {
    console.error("Error fetching chat response:", error);
  } finally {
    setIsLoading(false);
  }
};

export default getChatResponse;
