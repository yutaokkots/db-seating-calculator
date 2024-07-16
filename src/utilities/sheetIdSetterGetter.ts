/**
 * Sets and gets the previously used sheetId from localstorage.
 * 
 */

export const themeSetter = (sheetId: string) => {
    localStorage.setItem("sheetId", sheetId);
}

export const themeGetter = ():string => {
    const storedTheme = typeof window !== 'undefined'? localStorage.getItem("sheetId") : null;
    if (storedTheme == null) {
        return "";
    } else {
        return storedTheme;
    }
}