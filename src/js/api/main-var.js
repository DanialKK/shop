// access token control
class TokenControl {
    static key = "access-token"
    static expiresAt = "access-token-expires-at"
    static time = 60 * 60 * 1000

    get key() {
        return TokenControl.key
    }

    get keyExpires() {
        return TokenControl.expiresAt
    }

    get time() {
        return TokenControl.time
    }

    get accessToken() {
        if (rememberControl.rememberFlag) {
            return localStorage.getItem(this.key)
        }
        return sessionStorage.getItem(this.key)
    }

    setAccessToken(flag, token) {
        if (flag) {
            localStorage.setItem(this.key, token);
            localStorage.setItem(this.keyExpires, JSON.stringify(Date.now() + this.time));
        } else {
            sessionStorage.setItem(this.key, token)
            sessionStorage.setItem(this.keyExpires, JSON.stringify(Date.now() + this.time));
            rememberControl.removeRememberFlag()
        }
    }

    removeAccessToken() {
        localStorage.removeItem(this.key)
        localStorage.removeItem(this.keyExpires)
        rememberControl.removeRememberFlag()
        sessionStorage.removeItem(this.key)
        sessionStorage.removeItem(this.keyExpires)
    }

    isAccessTokenValid() {
        let expiresAt;

        if (rememberControl.rememberFlag === "true") {
            expiresAt = parseInt(JSON.parse(localStorage.getItem(this.keyExpires)));
        } else {
            expiresAt = parseInt(JSON.parse(sessionStorage.getItem(this.keyExpires)));
        }

        return Date.now() < expiresAt;
    }
}

// remember user login control
class RememberControl {
    static key = "remember-flag"

    get key() {
        return RememberControl.key
    }

    get rememberFlag() {
        return localStorage.getItem(this.key)
    }

    set rememberFlag(flag) {
        localStorage.setItem(this.key, flag)
    }

    removeRememberFlag() {
        localStorage.removeItem(this.key)
    }
}

const rememberControl = new RememberControl()
const tokenControl = new TokenControl()

export {
    rememberControl,
    tokenControl
}
