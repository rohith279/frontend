/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./OffCanvas.module.css";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import ClearIcon from "@mui/icons-material/Clear";
import LogoutIcon from "@mui/icons-material/Logout";
import handleButtonClick from "../utils/handleButtonClick";
import {MergeArrays} from "../utils/mergeArrays.js";

const OffCanvas = ({
  handleNewChat,
  handleLogout,
  handleClearConversations,
  conversationTitles,
                     conversationIds,
    user,
                     setMessages,
                     setCurrentChatId,
                     setInputText,
                     scrollToBottom,
                     setCurrentConversationTitle,
                     setCurrentConversationTopic,
                     setQuery,
                     setLastUserInput
}) => {
  const mergedArrays = MergeArrays(conversationTitles, conversationIds);
  return (
    <div
      className="offcanvas offcanvas-start custom-offcanvas"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabIndex="-1"
      id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div className="offcanvas-header">
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className={styles.upper_side}>
          <div className={styles.upper_side_top}>
            <span className={`${styles.brand} fw-bold mb-3`}>AI Blog</span>
            <button
              className={`${styles.mid_btn} w-100`}
              onClick={handleNewChat}
            >
              <AddIcon style={{ width: "40px" }} />
              New Chat
            </button>
            <div
              className={`${styles.upper_side_bottom} w-100 `}
              style={{ overflowY: "auto" }}
            >
              {mergedArrays.map(({title, id}) => (
                <button
                  key={id}
                  className={`${styles.query} w-100`}
                  onClick={() =>
                    handleButtonClick({
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
                    })
                  }
                >
                  <MessageIcon className="message-button-icon" /> {title}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="lowerSide w-100">
          <div className="">
            <div
              className={styles.list_items}
              onClick={handleClearConversations}
              style={{ cursor: "pointer" }}
            >
              <ClearIcon className={styles.list_img} /> Clear
            </div>
            <div
             className={styles.list_items}
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <LogoutIcon className={styles.list_img} /> LogOut
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffCanvas;
