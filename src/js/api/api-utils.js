"use strict";

function serverDisconnect(elem) {
    elem.textContent = "اتصال به سرور برقرار نشد. لطفاً بعداً تلاش کنید.";
}

async function getRealTehranTime() {
    const res = await fetch("https://api.keybit.ir/time/");
    const data = await res.json();
    return data.timestamp?.en * 1000;
}

// access token control
class TokenControl {
    constructor(time = 60 * 60 * 1000) {
        this.time = time
    }

    static key = "access-token"
    static expiresAt = "access-token-expires-at"

    get key() {
        return TokenControl.key
    }

    get keyExpires() {
        return TokenControl.expiresAt
    }

    get accessToken() {
        if (rememberControl.rememberFlag === "true") {
            return localStorage.getItem(this.key)
        }
        return sessionStorage.getItem(this.key)
    }

    async setAccessToken(flag, token) {
        const now = await getRealTehranTime();

        if (flag) {
            localStorage.setItem(this.key, token);
            localStorage.setItem(this.keyExpires, JSON.stringify(now + this.time));
            rememberControl.rememberFlag = "true"
        } else {
            sessionStorage.setItem(this.key, token)
            sessionStorage.setItem(this.keyExpires, JSON.stringify(now + this.time));
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

    async isAccessTokenValid() {
        const remember = rememberControl.rememberFlag === "true";
        const expiresRaw = remember ? localStorage.getItem(this.keyExpires) : sessionStorage.getItem(this.keyExpires);

        if (!expiresRaw) return false;

        const expiresAt = parseInt(JSON.parse(expiresRaw))

        const now = await getRealTehranTime();
        return now < expiresAt;
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

export {serverDisconnect, rememberControl, tokenControl}