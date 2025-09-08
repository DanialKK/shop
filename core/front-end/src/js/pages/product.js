import {getOneProducts} from "@/js/api/auth.js";
import productPage from "@/js/component/product-page/productPage.js"

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
    (() => {
        const allImg = document.querySelectorAll("[data-all-img]");
        const baseImg = document.querySelector("[data-base-img]");

        allImg.forEach(img => {
            img.addEventListener("click", () => {
                baseImg.src = img.src;
            })
        })
    })();
}