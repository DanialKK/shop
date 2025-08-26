import {rememberControl, tokenControl} from "@/js/api/api-utils.js";
import {checkLoginStatus} from "@/js/account/loginStatus.js";

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
async function loginUser(username, password, rememberMe) {
    const res = await fetch(`${baseApiURL}/auth/login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))

    await tokenControl.setAccessToken(rememberMe, data?.access)
    return data
}

// handle login
async function handleLoginUser(username, password, rememberMe) {
    return await loginUser(username, password, rememberMe)
}

// refresh tokens
async function newRefreshToken() {
    const res = await fetch(`${baseApiURL}/auth/token/refresh/`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
    })
    const json = await res.json()
    if (!res.ok || !json.access) throw new Error(JSON.stringify(json))
    await tokenControl.setAccessToken(rememberControl.rememberFlag === "true", json.access)
    return json
}

// handle refresh token
async function handleNewRefreshToken() {
    return await newRefreshToken()
}

// logout user
async function logOutUser() {
    const accessToken = tokenControl.accessToken
    const res = await fetch(`${baseApiURL}/auth/logout/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) throw new Error(JSON.stringify(res));
    return true
}

// handle log out user
async function handleLogoutUser() {
    const accessIsValid = await checkLoginStatus()

    if (accessIsValid) {
        return await logOutUser()
    } else {
        throw new Error(JSON.stringify(accessIsValid))
    }
}

// get user info
async function getUserInfo() {
    const getAccessToken = tokenControl.accessToken;
    const res = await fetch(`${baseApiURL}/auth/user/`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAccessToken}`,
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))
    return data
}

// handle get user info
async function handleGetUserInfo() {
    const accessIsValid = await checkLoginStatus()

    if (accessIsValid) {
        return await getUserInfo()
    } else {
        throw new Error(JSON.stringify(accessIsValid))
    }
}

// create category
async function createCategory(name, slug) {
    const getAccessToken = tokenControl.accessToken;
    const res = await fetch(`${baseApiURL}/categories/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, slug})
    })
    const data = await res.json()
    console.log(data)
    if (!res.ok) throw new Error(JSON.stringify(data))
    return data
}

// handle create category
async function handleCreateCategory(name, slug) {
    return await createCategory(name, slug);
}

// create tag
async function createTag(name, slug) {
    const getAccessToken = tokenControl.accessToken;
    const res = await fetch(`${baseApiURL}/tags/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, slug})
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(JSON.stringify(data));
    return data;
}

// handle create tag
async function handleCreateTag(name, slug) {
    return await createTag(name, slug);
}

// create product
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

// handle create product
async function handleCreateProduct(productData) {
    const checkAllTokenAreValid = await checkAndRefreshAllTokens()

    if (!checkAllTokenAreValid) {
        throw new Error("مشکلی پیش اومده، لطفا بعدا دوباره تلاش کنید");
    }

    return await createProduct(productData);
}

// get all category
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

// handle get all category
async function handleGetAllCategories() {
    return await getAllCategories()
}

// get all tags
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

// handle get all tags
async function handleGetAllTag() {
    return await getAllTags()
}

// create new product
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

// handle create new product
async function handleCreateNewProduct(productData) {
    return await createNewProduct(productData)
}

// get all product
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
