import {getOneProducts} from "@/js/api/auth.js";
import productPage from "@/js/component/product-page/productPage.js"
import {handleOrderProduct} from "@/js/api/auth.js";
import {tokenControl} from "@/js/api/api-utils.js";

export function init() {
    const productWrapper = document.getElementById('product-wrapper');
    const textMessage = document.getElementById("text-message");

    // product id in URLParams
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get("id");

    (async () => {
        try {
            const product = await getOneProducts(+productID);
            const template = productPage(product);
            productWrapper.insertAdjacentHTML("beforeend", template);

            // bind all events
            bindProductPageEvents()
        } catch (e) {
            console.log(e)
            if (e instanceof Error) {
                textMessage.innerHTML = "<h2 class='w-full text-center'>در حال حاضر سرور در دسترس نمیباشد</h2>"
            } else {
                console.error("more: ", e)
            }
        }
    })()
}

function bindProductPageEvents() {
    // change base image
    (() => {
        const allImg = document.querySelectorAll("[data-all-img]");
        const baseImg = document.querySelector("[data-base-img]");

        allImg.forEach(img => {
            img.addEventListener("click", () => {
                baseImg.src = img.src;
            })
        })
    })();

    // order item
    (() => {
        const orderItemBtn = document.getElementById("order-item-btn");
        const productMessage = document.getElementById("product-message");

        orderItemBtn.addEventListener("click", async e => {
            const accessToken = tokenControl.accessToken;

            if (!accessToken) {
                productMessage.textContent = "ابتدا باید وارد شوید"
                rememberProductNeedLogin.rememberProduct(orderItemBtn.dataset.productId)
                setTimeout(() => window.location.href = "/account/?mode=login", 2000)

            } else {
                const item = e.currentTarget.dataset.productId;

                try {
                    const res = await handleOrderProduct(item)
                } catch (e) {
                    console.log(e)
                }
            }
        })
    })();
}

// when user not login and redirect to login page, this function remember product after login
class RememberProductNeedLogin {
    constructor() {
        this.key = "productNeedLogin"
    }

    rememberProduct(id) {
        localStorage.setItem(this.key, id);
    }

    deleteRememberProduct() {
        localStorage.removeItem(this.key);
    }

    hasRememberProduct() {
        return localStorage.getItem(this.key) || false;
    }
}

// for remember product
export const rememberProductNeedLogin = new RememberProductNeedLogin();