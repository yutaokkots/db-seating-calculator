/**
 * Sets and gets the previously used sheetId from localstorage.
 * 
 */

export const idSetter = (sheetId: string) => {
    localStorage.setItem("sheetId", sheetId);
}

export const idGetter = ():string => {
    const storedId = typeof window !== 'undefined'? localStorage.getItem("sheetId") : null;
    if (storedId == null) {
        return "";
    } else {
        return storedId;
    }
}