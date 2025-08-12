const accessToken = "access-token"
const refreshToken = "refresh-token"

// remove tokens
function removeToken() {
    localStorage.removeItem(accessToken)
    localStorage.removeItem(refreshToken)
    sessionStorage.removeItem(accessToken)
    sessionStorage.removeItem(refreshToken)
}

export {accessToken, refreshToken, removeToken}