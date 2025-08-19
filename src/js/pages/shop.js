import {getAllProducts} from "@/js/api/auth.js";
import {serverDisconnect} from "@/js/api/api-utils.js";
import {createProductBox} from "@/js/main/main.js"

export function init() {
    const productsWrapper = document.getElementById('products-wrapper');
    (async () => {
        try {
            const products = await getAllProducts();
            const fragment = document.createDocumentFragment();
            products.forEach(product => {
                fragment.appendChild(createProductBox(product));
            })
            productsWrapper.appendChild(fragment);
        } catch (e) {
            console.log(e)
            productsWrapper.innerHTML = "<h2 class='w-full text-center'>در حال حاضر سرور در دسترس نمیباشد</h2>"
            if (e instanceof Error) {
                console.log("server is disconnect: ", e)
            } else {
                console.error("more: ", e)
            }
        }
    })()
    const data = {
        "id": 1,
        "image": "/static/img/custom/rainbow-six-siege-x-5760x2880-22839.jpg",
        "name": "کالاف دیوتی",
        "slug": "call-of-duty",
        "description": "call of duty black ops6",
        "price": "1200000.00",
        "stock": 12,
        "discount": 15,
        "average_rating": null,
        "created_at": "2025-08-17T16:07:18.413677Z",
        "category": 1,
        "category_detail": {
            "id": 1,
            "name": "بازی",
            "slug": "game"
        },
        "tags": [1, 2],
        "tags_detail": [
            { "id": 1, "name": "اکشن" },
            { "id": 2, "name": "تخیلی" }
        ]
    }

    const pr = createProductBox(data)
    // productsWrapper.appendChild(pr)
}