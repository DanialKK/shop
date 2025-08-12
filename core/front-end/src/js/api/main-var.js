const accessToken = "access-token"
const refreshToken = "refresh-token"
const accessTokenExpires = "access-token-expires-at"
const refreshTokenExpires = "refresh-token-expires-at"

// remove tokens
function removeToken() {
    localStorage.removeItem(accessToken)
    localStorage.removeItem(refreshToken)
    localStorage.removeItem(accessTokenExpires)
    localStorage.removeItem(refreshTokenExpires)
    sessionStorage.removeItem(accessToken)
    sessionStorage.removeItem(refreshToken)
    sessionStorage.removeItem(accessTokenExpires)
    sessionStorage.removeItem(refreshTokenExpires)
}

function getAccessToken() {
    return sessionStorage.getItem(accessToken) || localStorage.getItem(accessToken)
}

function getRefreshToken() {
    return sessionStorage.getItem(refreshToken) || localStorage.getItem(refreshToken)
}

function isAccessTokenValid() {
    const expiresAt = parseInt(JSON.parse(sessionStorage.getItem(accessTokenExpires))) || parseInt(JSON.parse(localStorage.getItem(accessTokenExpires)));
    if (!expiresAt) return false;
    return Date.now() < expiresAt;
}

function isRefreshTokenValid() {
    const expiresAt = parseInt(JSON.parse(sessionStorage.getItem(refreshTokenExpires))) || parseInt(JSON.parse(localStorage.getItem(refreshTokenExpires)));
    if (!expiresAt) return false;
    return Date.now() < expiresAt;
}

export {
    accessToken,
    refreshToken,
    removeToken,
    accessTokenExpires,
    refreshTokenExpires,
    isAccessTokenValid,
    isRefreshTokenValid,
    getAccessToken,
    getRefreshToken
}
