import React, { useEffect, useState, useRef } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, push, update, remove } from "firebase/database";
import "./index.css";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useNavigate } from "react-router-dom";
import ModalProvider from "../modal-default/ModalProvider";
import {deleteAllConversations, doSignOut, getConversation, getConversationTitles, saveConversation} from "../../Auth.js";
import { auth, db } from "../../FirebaseConfig.js";
import styles from "../LandingPage/header/Header.module.css";
import {FaUser} from "react-icons/fa";

import Sidebar from "./sidebar/Sidebar.jsx";

import OffCanvas from "./offcanvas/OffCanvas.jsx";
import MainChatComponent from "./main-chat-component/MainChatComponent.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import generateMore from "./utils/generateMore.js";
import handleNewChat from "./utils/handleNewChat.js";
import handleLogout from "./utils/handleLogout.js";
import getChatResponse from "./utils/getChatResponse.js";
import {getAllTopics} from "../../Api.js";

const Index = () => {
  const {user} = useAuth()
  const [inputText, setInputText] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter Prompt");
  const [query, setQuery] = useState("");

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [conversationIds, setConversationIds] = useState([]);
  const [conversationTitles, setConversationTitles] = useState([]);
  const [conversationTopics, setConversationTopics] = useState([]);
  const [currentConversationTitle, setCurrentConversationTitle] = useState("");
  const [currentConversationTopic, setCurrentConversationTopic] = useState("");
  const [currentChatId, setCurrentChatId] = useState("");
  const [lastUserInput, setLastUserInput] = useState("");

  const [showModal, setShowModal] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigation = useNavigate();

  const apiKey = "sk-None-yzegp2tlvEqpDJ9mTV27T3BlbkFJAYoeAg5SeyAOlWSqV9up";
  const apiUrl = "https://21r2uzrw97.execute-api.us-east-2.amazonaws.com/prod/ask?query=";

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (user) {
     const data = getConversationTitles(user.uid);
     const topics = getAllTopics();
        data.then((data) => {
            setConversationIds(data.conversation_ids);
            setConversationTitles(data.titles);
            /*console.log("titles: ", data.titles);
            console.log("conversation_ids: ", data.conversation_ids);*/
        });
        topics.then((data) => {
            setConversationTopics(data);
        } );
    }
  }, [user, currentConversationTitle]);

  useEffect(() => {
    if (currentConversationTopic) {
        let placeholder = "";
        conversationTopics.forEach((topic) => {
            if (topic.title === currentConversationTopic) {
                setQuery(topic.prompt)
                placeholder = topic.placeholder;
            }
        });
        handleSetInputAndFocus(query, placeholder);
    }
  }, [currentConversationTopic]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClearConversations = () => {
      const res = deleteAllConversations(user.uid);
        res.then(() => {
            setConversationTitles([]);
            setConversationIds([]);
            setCurrentConversationTitle("");
            setCurrentConversationTopic("")
            setMessages([]);
            setInputText("");
            setCurrentChatId("");
            setLastUserInput("");
        });
  }

  const handleSetInputAndFocus = (query, placeholder) => {
    setQuery(query);
    setPlaceholder(placeholder);
    inputRef.current.focus();
  };

  const handleSend = () => {
    if (query === "") {
      setShowModal(true);
      return;
    }
    if (inputText.trim() !== "") {
      getChatResponse({
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
      })/*.then(r => console.log("r", r))*/;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        /*console.log("Text copied to clipboard");*/
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };


  return (
      <>
        <div className="container-fluid main-container">
          <div className="row vh-100">
            <Sidebar
                user={user}
                setMessages={setMessages}
                setCurrentChatId={setCurrentChatId}
                setInputText={setInputText}
                scrollToBottom={scrollToBottom}
                setCurrentConversationTitle={setCurrentConversationTitle}
                setCurrentConversationTopic={setCurrentConversationTopic}
                handleNewChat={() =>
                    handleNewChat({
                      setCurrentConversationTitle,
                        setCurrentChatId,
                      setMessages,
                      setInputText,
                        setCurrentConversationTopic,
                        setLastUserInput
                    })
                }
                handleLogout={() =>
                    handleLogout({
                      doSignOut,
                      navigation,
                    })
                }
                handleClearConversations={() => handleClearConversations()}
                conversationTitles={conversationTitles}
                conversationIds={conversationIds}
                setQuery={setQuery}
                setLastUserInput={setLastUserInput}
            />
            {/* Main Content Column */}
            <div className="col-12 col-lg-9 col-xl-9 col-xxl-10 ">
              <div className="row d-flex flex-column ">
                <div className="col shadow">
                  <div className=" d-flex d-lg-none justify-content-between p-2">
                    <div>
                      <button
                          className="btn btn-primary border-0 text-light bg-transparent me-auto p-1"
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasScrolling"
                          aria-controls="offcanvasScrolling"
                      >
                        <ReorderIcon className="menu" />
                      </button>

                      <OffCanvas
                          setMessages={setMessages}
                            setCurrentChatId={setCurrentChatId}
                            setInputText={setInputText}
                            scrollToBottom={scrollToBottom}
                            setCurrentConversationTitle={setCurrentConversationTitle}
                          setCurrentConversationTopic={setCurrentConversationTopic}
                          handleNewChat={() =>
                              handleNewChat({
                                setCurrentConversationTitle,
                                setMessages,
                                  setCurrentChatId,
                                setInputText,
                                  setCurrentConversationTopic,
                                  setLastUserInput
                              })
                          }
                          handleLogout={() =>
                              handleLogout({
                                doSignOut,
                                navigation,
                              })
                          }
                          handleClearConversations={() =>
                              handleClearConversations()
                          }
                          conversationTitles={conversationTitles}
                          conversationIds={conversationIds}
                          user={user}
                          setQuery={setQuery}
                          setLastUserInput={setLastUserInput}
                      />
                    </div>
                    <div>
                          <div className="chatImg me-0">
                            {user && user?.photoURL ? (
                                <img
                                    src={user?.photoURL}
                                    alt="user"
                                    className={styles.userImage}
                                />
                            ) : (
                                <FaUser size={50} className={styles.FA} />
                            )}
                          </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="row d-flex flex-column h-100">
                    <div className="col">
                      <div className=" d-flex justify-content-end pt-3 pe-3  ">
                        {currentConversationTitle && (
                            <p className="h5 ms-auto me-auto fw-bold">
                              {currentConversationTitle}
                            </p>
                        )}
                            <div className="chatImg me-2 d-none d-lg-flex">
                              {user && user?.photoURL ? (
                                  <img
                                      src={user?.photoURL}
                                      alt="user"
                                      className={styles.userImage}
                                  />
                              ) : (
                                  <FaUser size={50} className={styles.FA} />
                              )}
                            </div>
                      </div>
                    </div>

                    <div className="col">
                      <MainChatComponent
                          currentConversationTopic={currentConversationTopic}
                          messages={messages}
                          photoURL={user?.photoURL}
                          handleCopy={handleCopy}
                          setInputText={setInputText}
                          generateMore={() =>
                              generateMore(
                                  {
                                      setIsLoading,
                                      setMessages,
                                        currentConversationTopic,
                                      setInputText,
                                      currentChatId,
                                      setCurrentChatId,
                                      setConversationTitles,
                                      setConversationIds,
                                      apiKey,
                                      query,
                                      apiUrl,
                                      messages,
                                      setCurrentConversationTitle,
                                      user,
                                      setLastUserInput
                                  }
                              )
                          }
                          chatEndRef={chatEndRef}
                          isLoading={isLoading}
                          query={query}
                          handleSetInputAndFocus={handleSetInputAndFocus}
                          inputRef={inputRef}
                          inputText={inputText}
                          handleKeyPress={handleKeyPress}
                          placeholder={placeholder}
                          handleSend={handleSend}
                          setCurrentConversationTopic={setCurrentConversationTopic}
                          topics={conversationTopics}
                          setLastUserInput={setLastUserInput}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ModalProvider isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
  );
};

export default Index;
