export function getFromLocalStorage(name: string){
    return localStorage.getItem(name)
}
export function saveToLocalStorage(name: string, item: string) {
    localStorage.setItem(name, item)
}
export function deleteInLocalStorage(name: string) {
    localStorage.removeItem(name)
}