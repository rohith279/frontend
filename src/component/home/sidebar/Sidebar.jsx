/* eslint-disable react/prop-types */
import styles from './Sidebar.module.css';
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import ClearIcon from "@mui/icons-material/Clear";
import LogoutIcon from "@mui/icons-material/Logout";
import handleButtonClick from '../utils/handleButtonClick';
import {MergeArrays} from "../utils/mergeArrays.js";

const Sidebar = ({handleNewChat, handleLogout,
                   setMessages,
                   setCurrentChatId,
                   setInputText,
                   scrollToBottom,
                   setCurrentConversationTitle,
                   handleClearConversations ,conversationTitles, conversationIds,
                     setCurrentConversationTopic,
                     user,
                     setQuery,
                     setLastUserInput
}) => {
  const mergedArrays = MergeArrays(conversationTitles, conversationIds);
  return (
    <>
      <div className="d-none d-lg-flex col-lg-3 col-xl-3 col-xxl-2 flex-column sidebar">
        <div className={styles.upper_side}>
          <div className={styles.upper_side_top}>
            <span className={`${styles.brand} fw-bold mb-3`}>AI Blog</span>
            <button className="midBtn w-100" onClick={handleNewChat}>
              <AddIcon style={{ width: "40px" }} />
              New Chat
            </button>
            <div
              className="upperSideBottom w-100 "
              style={{ overflowY: "auto" }}
            >
              {mergedArrays.map(({title, id}) => (
                <button
                  key={id}
                  className={`${styles.query} w-100`}
                  onClick={() => handleButtonClick({title, id,
                    setMessages,
                    setCurrentChatId,
                    setInputText,
                    scrollToBottom,
                    setCurrentConversationTitle,
                      setCurrentConversationTopic,
                      user,
                      setQuery,
                      setLastUserInput
                  })}
                >
                  <MessageIcon className="bi bi-chat-left-text-fill" /> {title}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="lowerSide w-100 ">
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
    </>
  );
};

export default Sidebar;
