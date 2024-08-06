export const MergeArrays = (conversetionTitles, conversetionIds) => {
    let mergedArray = [];
    for (let i = 0; i < conversetionIds.length; i++) {
        mergedArray.push({
        title: conversetionTitles[i],
        id: conversetionIds[i]
        });
    }
    return mergedArray;
}