export const normalize = (arrOfObjects) => {
    return arrOfObjects.reduce((normalized, obj) => {
        normalized[obj.id] = obj;
        return normalized;
    } , {})
}
