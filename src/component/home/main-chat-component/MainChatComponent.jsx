/* eslint-disable react/prop-types */
import styles from './MainChatComponent.module.css';
import classNames from 'classnames';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {FaUser} from "react-icons/fa";
import React from "react";

const MainChatComponent = ({
  messages,
                             photoURL,
  handleCopy,
  generateMore,
  chatEndRef,
  isLoading,
  query,
  handleSetInputAndFocus,
  inputRef,
  inputText,
                             setInputText,
  handleKeyPress,
  placeholder,
  handleSend,
                             setCurrentConversationTopic,
    currentConversationTopic,
    topics
}
) => {
    /*console.log("currentConversationTopic", currentConversationTopic)*/
  return (
    <div className={styles.main}>
      <div className={styles.chats}>
        {messages.map((message, i) => (
          <div
            key={i}
            className={classNames([styles.chat, message.role === "bot" ? styles.bot : styles.user])}
          >
            {message.role === "user" && (
              <div className={`${styles.chat_img} me-2`}>
                {photoURL ? (
                    <img
                        src={photoURL}
                        alt="user"
                        className={styles.FA}
                    />
                ) : (
                    <FaUser size={50} className={styles.FA} />
                )}
              </div>
            )}
            {message.role !== "system" && (
              <p
                className={`txt pe-3 ${
                  message.role === "user" ? "fw-bold" : ""
                }`}
              >
                {message.content}
              </p>
            )}
            {message.role === "bot" && (
              <ContentCopyIcon
                className={styles.copyIcon}
                style={{ cursor: "pointer" }}
                onClick={() => handleCopy(message.content)}
              />
            )}
          </div>
        ))}

        {messages.length > 0 && (
          <div className="chat generate-more">
            <button className="generate-more-button" onClick={generateMore}>
              Generate More
            </button>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="w-100 d-flex align-items-center justify-content-center pb-3 pt-3 flex-column gap-3">
        <div>
          {isLoading && (
            <div className="bubble">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
        </div>
        <div className={styles.topics}>
          {topics && topics.map((topic) => (
              <button
                    key={topic.title}
                  style={{
                    display: currentConversationTopic !== topic.title && messages.length > 0 ? "none" : "",
                  }}
                  type="button"
                  className={styles.topic + " " +`btn btn-outline-light me-1 me-sm-3 ${
                      currentConversationTopic === topic.title
                          ? "active current"
                          : ""
                  }`}
                  onClick={() => {
                    setCurrentConversationTopic(topic.title)
                    handleSetInputAndFocus(
                        topic.prompt,
                        topic.placeholder
                    )
                  }
                  }
              >
                {topic.title}
              </button>
          ))
          }
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
                ref={inputRef}
                type="text"
                className="form-control"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
            />
            <button
                className="send rounded-3 ms-2"
                onClick={handleSend}
                disabled={isLoading}
                title={
                  query.length === 0 ? "Cannot generate when query is empty" : ""
              }
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChatComponent;
