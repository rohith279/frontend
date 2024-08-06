export const replaceNumbers = (messages) => {
    return messages.map(message => message.replace(/^\d+\.\s*/, ''));
}

export const replaceSymbols = (messages) => {
    let map = messages.map(message => message.replaceAll("\'", ''));
    map = map.map(message => message.replaceAll("\"", ''));
    map = map.map(message => message.replace("-", ''));
    return map;
}

export const removeEmpty = (messages) => {
    return messages.filter(message => message !== "");
}

export const replaceN = (messages) => {
    return messages.map(message => message.replace("/n", "\n"));
}

export const replaceDoubleSpace = (messages) => {
    return messages.map(message => message.replace("  ", " "));
}

export const replaceAll = (messages) => {
    return replaceDoubleSpace(replaceN(removeEmpty(replaceSymbols(replaceNumbers(messages)))));
}