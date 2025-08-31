import {getOneProducts} from "@/js/api/auth.js";

export function init() {
    const productsWrapper = document.getElementById('product');
    const textMessage = document.getElementById("text-message");

    (async () => {
        try {
            // const product = await getOneProducts(1);
            // console.log(product)
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