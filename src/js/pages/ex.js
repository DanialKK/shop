const baseApiURL = import.meta.env.VITE_API_BASE_URL;

export function init() {
    // authorization account with superuser data
    async function authAdmin(username, password) {
        const res = await fetch(`${baseApiURL}/token/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
        })

        if (!res.ok) throw new Error("login failed");

        return await res.json()
    }

// set tokens in localStorage
    (async (username, password) => {
        try {
            const admin = await authAdmin(username, password);
            localStorage.setItem("access", admin.access)
            localStorage.setItem("refresh", admin.refresh)

        } catch (err) {
            console.error(`admin login failed: ${err.message}`);
        }
    })("homow", "12345678")

// refresh access token
    async function refreshToken() {
        const refToken = localStorage.getItem("refresh");
        const res = await fetch(`${baseApiURL}/token/refresh/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({refresh: refToken}),
        })

        if (!res.ok) throw new Error("login failed");

        const data = await res.json()
        localStorage.setItem("access", data.access)
        return data.access;
    }

    async function fetchProducts() {
        let token = localStorage.getItem("access");
        let res = await fetch(`${baseApiURL}/products/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (res.status === 401) {
            token = await refreshToken();
            res = await fetch(`${baseApiURL}/products/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
        }

        if (!res.ok) throw new Error("fetch products failed: " + res.status);

        return res.json();
    }

    async function getProducts() {
        try {
            return await fetchProducts()
        } catch (e) {
            console.error(`getProducts failed: ${e}`);
        }
    }

    (async () => {
        const products = await getProducts();
        console.log(products);
    })();
}
