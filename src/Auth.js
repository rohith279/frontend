import {auth, db} from "./FirebaseConfig.js";
import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword
} from "firebase/auth";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";

import {CONVERSATIONS_COLLECTION, USERS_COLLECTION} from "./consts.js";
import axios from "axios";

export const doCreateUserWithEmailAndPasswordAndUsername = async (email, password, username) => {
    try {
        let isSuccessful = false;
        await createUserWithEmailAndPassword(auth, email, password).then(async (user) => {
            /*console.log(user);*/
            await setDoc(doc(db, "users", user.user.uid), {
                username: username,
                email: email
            });
            isSuccessful = true;
        });
        return isSuccessful;
    } catch (error) {
        alert("This user already exists!")
    }
}

export const getConversations = async (uid) => {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION, uid, CONVERSATIONS_COLLECTION));
    let conversations = [];
    querySnapshot.forEach((doc) => {
        conversations.push(doc.data());
    });
    return conversations;

}

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

export const getConversation = async (uid, conversation_id) => {
    /*const docRef = doc(db, USERS_COLLECTION, uid, CONVERSATIONS_COLLECTION, conversation_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }*/
    const response = await axios.get(base_url + "getMessages/" + uid + "/" + conversation_id);
    return response.data;
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
    const response = await axios.post(base_url + "createChat", {
        uid: uid,
        title: title,
        messages: messages,
        topic: topic
    });
    const data = await response.data;
/*    console.log("data in create", data);*/
    return data.id;
}

export const updateConversation = async (uid, conversation_id, title, messages) => {
    /*await updateDoc(doc(db, USERS_COLLECTION, uid, CONVERSATIONS_COLLECTION, conversation_id), {
        messages: messages
    });*/
    const response = await axios.post(base_url + "addMessages/" + conversation_id, {
        messages: messages
    });
    return response.data;
}

export const saveConversation = async (uid, conversation_id, title, messages, topic) => {
    /*console.log("Title: " + title)
    console.log(await getConversation(uid, conversation_id));*/
    if (await getConversation(uid, conversation_id)) {
        await updateConversation(uid, title, messages);
        /*console.log(await getConversation(uid, title));*/
    }
    else {
        await createConversation(uid, title, messages, topic);
        /*console.log(await getConversation(uid, title));*/
    }
}

/*export const deleteConversation = async (uid, conversation_id) => {
    await deleteDoc(doc(db, USERS_COLLECTION, uid, CONVERSATIONS_COLLECTION, conversation_id));
}*/

export const deleteAllConversations = async (uid) => {
    /*console.log("Deleting all conversations for user: " + uid);*/
    /*const querySnapshot = await getDocs(collection(db, USERS_COLLECTION, uid, CONVERSATIONS_COLLECTION));
    querySnapshot.forEach((doc) => {
        /!*console.log("Deleting conversation: " + doc.id);*!/
        deleteConversation(uid, doc.id);
    });*/

    const response = await axios.delete(base_url + "deleteAllChats/" + uid);
    return !!response.data;
}

export const addMessageToConversation = async (uid, conversation_id, title, sender, message) => {
    let conversation = await getConversation(uid, conversation_id);
    if (!conversation) {
        await createConversation(uid, title, [], null);
        conversation = await getConversation(uid, conversation_id);
    }
    conversation.messages.push({
        sender: sender,
        message: message
    });
    await updateConversation(uid, conversation_id, title, conversation);
}

export const updateTopic = async (uid, conversation_id, title, topic) => {
    let conversation = await getConversation(uid, conversation_id);
    const docRef = doc(db, USERS_COLLECTION, uid, CONVERSATIONS_COLLECTION, conversation_id);
    const docSnap = await getDoc(docRef);
    await setDoc(docRef, {
        topic: topic,
        messages: conversation.messages
    });

}


export const doCreateUserWithEmailAndPassword = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert("This user already exists!")
    }
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    try {
        let isSuccessful = false;
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                isSuccessful = true;
            });
        return isSuccessful;
    } catch (error) {
       alert("Email or password is incorrect!")
    }
}

export const doSignInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then((user) => {
            setDoc(doc(db, "users", user.user.uid), {
                username: user.user.displayName ? user.user.displayName.split(" (")[0]
                    : user.user.email ? user.user.email.split("@")[0] : "User",
                email: user.user.email
            });
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const doSignInWithGithub = async () => {
    try {
        const provider = new GithubAuthProvider();
        await signInWithPopup(auth, provider).then((user) => {
            setDoc(doc(db, "users", user.user.uid), {
                username: user.user.displayName ? user.user.displayName.split(" (")[0]
                    : user.user.email ? user.user.email.split("@")[0] : "User",
                email: user.user.email
            });
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const doSignOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error.message);
    }
}

export const doPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.log(error.message);
    }
}

export const doPasswordUpdate = async (password) => {
    try {
       if (auth.currentUser) {
           await updatePassword(auth.currentUser, password);
       }
    } catch (error) {
        console.log(error.message);
    }
}

export const doSendEmailVerification = async () => {
    try {
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser);
        }
    } catch (error) {
        console.log(error.message);
    }
}