// config api url
const configAPI = () => {
    if (window.API_CONFIG && window.API_CONFIG.API_BASE_URL) {
        return window.API_CONFIG.API_BASE_URL;
    }
    return import.meta.env.VITE_API_BASE_URL;
}
const baseApiURL = configAPI();

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
    const checkPassword = validatePassword(password)
    if (password !== password2) throw new Error("رمز های عبور شما یکسان نیست!")
    if (checkPassword) throw new Error(checkPassword)
    return await registerUser({username, email, password, password2})
}

// login
async function loginUser(username, password, remember = false) {
    const res = await fetch(`${baseApiURL}/auth/login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
    })
    if (!res.ok) throw new Error("هنوز ثبت نام نکردید یا اطلاعتتون اشتباهه")

    const data = await res.json()
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem("access", data.access);
    storage.setItem("refresh", data.refresh);

    return data
}

// handle login
async function handleLoginUser({username, password, remember}) {
    return await loginUser(username, password, remember)
}

// get user info
async function getUserInfo () {
    const token = sessionStorage.getItem("access") || localStorage.getItem("access");
    const res = await fetch(`${baseApiURL}/auth/user/`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    console.log(res)
    const json = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(json))
    return json
}

// handle get user info
async function handleGetUserInfo() {
    return await getUserInfo()
}

// refresh tokens
async function refreshToken() {
    const refreshToken = sessionStorage.getItem("refresh") || localStorage.getItem("refresh");
    const res = await fetch(`${baseApiURL}/token/refresh/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({refresh: refreshToken}),
    })
    console.log(res)
    const json = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(json))
    return json
}

// handle refresh token
async function handleRefreshToken() {
    return await refreshToken()
}

// create category
async function createCategory(name, slug) {
    const token = sessionStorage.getItem("access") || localStorage.getItem("access");
    const res = await fetch(`${baseApiURL}/categories/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
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

export {handleRegisterUser, handleLoginUser, handleGetUserInfo, handleRefreshToken, handleCreateCategory}
