"use strict";

import {tokenControl, rememberControl} from "@/js/api/api-utils.js";
import {handleNewRefreshToken} from "@/js/api/auth.js";

async function checkLoginStatus() {
    const hasAccessToken = tokenControl.accessToken || false;
    if (!hasAccessToken) return false;

    const isValid = await tokenControl.isAccessTokenValid();

    if (isValid) {
        return true;
    } else {
        try {
            const data = await handleNewRefreshToken();
            await tokenControl.setAccessToken(rememberControl.rememberFlag === "true", data.access);
            return true;
        } catch (err) {
            console.log(err)
            tokenControl.removeAccessToken();
            return false;
        }
    }
}

export {checkLoginStatus};