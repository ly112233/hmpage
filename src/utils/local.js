function saveLocal(value) {
  window.localStorage.setItem('token', value)
}

function getLocal() {
  return window.localStorage.getItem('token')
}
function removeLocal() {
  window.localStorage.removeItem('token')
}
export { saveLocal, getLocal, removeLocal }