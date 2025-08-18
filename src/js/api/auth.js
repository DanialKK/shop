import {
    refreshToken,
    accessToken,
    accessTokenExpires,
    refreshTokenExpires,
    isRefreshTokenValid,
    isAccessTokenValid,
    getAccessToken,
    getRefreshToken, removeToken,
} from "@/js/api/main-var.js";

// config api url
const baseApiURL = "/api";

// validate password in signup
function validatePassword(password) {
    const errors = [];

    // طول رمز عبور
    if (password.length < 8) {
        errors.push("رمز عبور باید حداقل ۸ کاراکتر باشد.");
    }

    // فقط عدد بودن
    if (/^\d+$/.test(password)) {
        errors.push("رمز عبور نمی‌تواند فقط شامل اعداد باشد.");
    }

    // فقط حروف بودن
    if (/^[a-zA-Z]+$/.test(password)) {
        errors.push("رمز عبور نمی‌تواند فقط شامل حروف باشد.");
    }

    // رمزهای رایج
    const commonPasswords = [
        "123456", "12345678", "password", "qwerty", "111111", "abc123",
        "123123", "qwer1234", "admin", "letmein", "welcome"
    ];
    if (commonPasswords.includes(password.toLowerCase())) {
        errors.push("رمز عبور خیلی رایج و ساده است.");
    }

    // تکرار کاراکترها مثل "aaaaaaa"
    if (/^(.)\1+$/.test(password)) {
        errors.push("رمز عبور نباید شامل کاراکترهای تکراری باشد.");
    }

    return errors.length ? errors : null;
}

// signup
async function registerUser({username, email, password, password2}) {
    const res = await fetch(`${baseApiURL}/auth/register/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, email, password, password2}),
    })

    const data = await res.json()
    if (!res.ok) throw data
    return data
}

// handle signup
async function handleRegisterUser({username, email, password, password2}) {
    if (password !== password2) throw new Error("رمز های عبور شما یکسان نیست!")
    const checkPassword = validatePassword(password)
    if (checkPassword) throw new Error(checkPassword[checkPassword.length - 1])
    return await registerUser({username, email, password, password2})
}

// login
async function loginUser(username, password) {
    const res = await fetch(`${baseApiURL}/auth/login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))

    localStorage.setItem(accessToken, data.access);
    localStorage.setItem(refreshToken, data.refresh);
    localStorage.setItem(accessTokenExpires, JSON.stringify(Date.now() + 60 * 60 * 1000));
    localStorage.setItem(refreshTokenExpires, JSON.stringify(Date.now() + 24 * 60 * 60 * 1000));

    return data
}

// handle login
async function handleLoginUser({username, password, remember}) {
    return await loginUser(username, password, remember)
}

// check and refresh tokens
async function checkAndRefreshAllTokens() {
    const getAccessTokenIsValid = isAccessTokenValid();
    const getRefreshTokenIsValid = isRefreshTokenValid();

    if (!getRefreshTokenIsValid) {
        removeToken()
        window.location.href = "/account/?mode=login"
        return false;
    }

    if (!getAccessTokenIsValid) {
        try {
            // عملیات رفرش توکن access
        } catch (e) {
            window.location.href = "/account/?mode=login"
            return false;
        }
    }
    return true;
}

// logout user
async function logOutUser() {
    const gotAccessToken = getAccessToken();
    const gotRefreshToken = getRefreshToken();
    const res = await fetch(`${baseApiURL}/auth/logout/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${gotAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({refresh: gotRefreshToken})
    });

    if (!res.ok) throw new Error(JSON.stringify(res));
    return true
}

// handle log out user
async function handleLogoutUser() {
    const checkAllTokenAreValid = await checkAndRefreshAllTokens()

    if (!checkAllTokenAreValid) {
        throw new Error("مشکلی پیش اومده، لطفا بعدا دوباره تلاش کنید");
    }

    return await logOutUser()
}

// get user info
async function getUserInfo() {
    const gotAccessToken = getAccessToken();
    const res = await fetch(`${baseApiURL}/auth/user/`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${gotAccessToken}`,
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))
    return data
}

// handle get user info
async function handleGetUserInfo() {
    const checkAllTokenAreValid = await checkAndRefreshAllTokens()

    if (!checkAllTokenAreValid) {
        throw new Error("مشکلی پیش اومده، لطفا بعدا دوباره تلاش کنید");
    }

    return await getUserInfo()
}

// refresh tokens
async function newRefreshToken() {
    const gotRefreshToken = getRefreshToken();
    const res = await fetch(`${baseApiURL}/token/refresh/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({refresh: gotRefreshToken}),
    })
    console.log(res)
    const json = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(json))
    return json
}

// handle refresh token
async function handleNewRefreshToken() {
    const refreshTokenIsValidNow = isRefreshTokenValid();

    if (!refreshTokenIsValidNow) {
        window.location.href = "/account/?mode=login"
        return false;
    }
    return await newRefreshToken()
}

// create category
async function createCategory(name, slug) {
    const gotAccessToken = getAccessToken();
    const res = await fetch(`${baseApiURL}/categories/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${gotAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, slug})
    })
    const data = await res.json()
    console.log(data)
    if (!res.ok) throw new Error(JSON.stringify(data))
    return data
}

async function handleCreateCategory(name, slug) {
    return await createCategory(name, slug);
}

// create tag
async function createTag(name, slug) {
    const gotAccessToken = getAccessToken();
    const res = await fetch(`${baseApiURL}/tags/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${gotAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, slug})
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(JSON.stringify(data));
    return data;
}

async function handleCreateTag(name, slug) {
    return await createTag(name, slug);
}

async function createProduct(productData) {
    const gotAccessToken = getAccessToken();
    const res = await fetch(`${baseApiURL}/products/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${gotAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(JSON.stringify(data))
    return data;
}

async function handleCreateProduct(productData) {
    const checkAllTokenAreValid = await checkAndRefreshAllTokens()

    if (!checkAllTokenAreValid) {
        throw new Error("مشکلی پیش اومده، لطفا بعدا دوباره تلاش کنید");
    }

    return await createProduct(productData);
}

async function getAllCategories() {
    const res = await fetch(`${baseApiURL}/categories/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))
    return data
}

async function handleGetAllCategories() {
    return await getAllCategories()
}

async function getAllTags() {
    const res = await fetch(`${baseApiURL}/tags/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))
    return data
}

async function handleGetAllTag() {
    return await getAllTags()
}

async function createNewProduct(productData) {
    const gotAccessToken = getAccessToken();
    const res = await fetch(`${baseApiURL}/products/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${gotAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))
    return data
}

async function handleCreateNewProduct(productData) {
    const checkAllTokenAreValid = await checkAndRefreshAllTokens()
    if (!checkAllTokenAreValid) {
        throw new Error("مشکلی وجود دارد")
    }
    return await createNewProduct(productData)
}

async function getAllProducts() {
    const res = await fetch(`${baseApiURL}/products/`)
    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))
    return data
}

export {
    handleRegisterUser,
    handleLoginUser,
    handleGetUserInfo,
    handleNewRefreshToken,
    handleCreateCategory,
    handleLogoutUser,
    handleCreateTag,
    handleCreateProduct,
    handleGetAllCategories,
    handleGetAllTag,
    handleCreateNewProduct,
    getAllProducts,
}
