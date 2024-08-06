import {doc, updateDoc} from "firebase/firestore";
import {db} from "./FirebaseConfig.js";
import {CONVERSATIONS_COLLECTION, USERS_COLLECTION} from "./consts.js";

const base_url = "https://login.rohitvuyula.com/api/";


export const getConversationTitles = async (uid) => {
    /*let titles = [];
    let conversation_ids = [];
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION, uid, CONVERSATIONS_COLLECTION));

    querySnapshot.forEach((doc) => {
        conversation_ids.push(doc.id);
        titles.push(doc.data().title);
    });
    return {titles: titles, conversation_ids: conversation_ids};*/
    const response = await fetch(base_url + "getAllChats/" + uid);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const conversations = await response.json();
    let titles = [];
    let conversation_ids = [];
    conversations.forEach((conversation) => {
        conversation_ids.push(conversation.id);
        titles.push(conversation.title);
    });
    return {titles: titles, conversation_ids: conversation_ids};
}

export const getAllTopics = async () => {
    const response = await fetch(base_url + "getAllMenus");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return await response.json();
}

export const getConversation = async (uid, conversation_id) => {
    /*const docRef = doc(db, USERS_COLLECTION, uid, CONVERSATIONS_COLLECTION, conversation_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }*/
    const response = await fetch(base_url + "getChat/" + uid + "/" + conversation_id);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return await response.json();
}

export const createConversation = async (uid, title, messages, topic) => {
    /*const new_doc = await addDoc(collection(db, USERS_COLLECTION, uid, CONVERSATIONS_COLLECTION), {
        topic: topic,
        title: title,
        messages: messages
    });
    const conversation_id = new_doc.id;
    /!*console.log("conversation_id in createConversation",conversation_id);
    console.log("messages",messages);*!/
    if (messages && messages.length > 0) {
        await updateConversation(uid, conversation_id, title, messages);
    }
    return conversation_id;*/
    const response = await fetch(base_url + "createChat", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uid: uid,
            title: title,
            topic: topic,
            messages: messages
        })
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data in create", data);
    return data.id;
}

export const updateConversation = async (uid, conversation_id, title, messages) => {
    /*await updateDoc(doc(db, USERS_COLLECTION, uid, CONVERSATIONS_COLLECTION, conversation_id), {
        messages: messages
    });*/
    const response = await fetch(base_url + "addMessages/" + conversation_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: messages
        })
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
}