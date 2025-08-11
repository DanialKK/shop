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
    if (password.length < 8) {
        return "رمز عبور باید حداقل 8 کاراکتر باشد.";
    }

    if (/^\d+$/.test(password)) {
        return "رمز عبور نمی‌تواند فقط شامل اعداد باشد.";
    }

    const commonPasswords = ["12345678", "password", "qwerty", "11111111"];
    if (commonPasswords.includes(password.toLowerCase())) {
        return "رمز عبور خیلی ساده است.";
    }
    return null;
}

// signup
async function registerAdmin({username, email, password, password2}) {
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
async function handleRegisterAdmin({username, email, password, password2}) {
    const checkPassword = validatePassword(password)
    if (password !== password2) throw new Error("رمز های عبور شما یکسان نیست!")
    if (checkPassword) throw new Error(checkPassword)
    return await registerAdmin({username, email, password, password2})
}

// login
async function loginAdmin(username, password, remember = false) {
    const res = await fetch(`${baseApiURL}/auth/login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
    })
    console.log(`${baseApiURL}/auth/login/`)
    console.log(res)
    if (!res.ok) throw new Error("هنوز ثبت نام نکردید یا اطلاعتتون اشتباهه")

    const data = await res.json()
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem("access", data.access);
    storage.setItem("refresh", data.refresh);

    return data
}

// handle login
async function handleLoginAdmin({username, password, remember}) {
    return await loginAdmin(username, password, remember)
}

// test
async function createCategory(name, slug) {
    const token = localStorage.getItem("access")
    const res = await fetch(`${baseApiURL}/categories/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, slug
        })
    })

    if (!res.ok) throw res
    return await res.json()
}

export {handleRegisterAdmin, handleLoginAdmin, createCategory}
