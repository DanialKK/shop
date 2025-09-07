const productPage = data => {
    return `
    <div data-id="1">
                <div id="product-gallery">
                    <div id="product-base-image" class="rounded-sm overflow-hidden">
                        <img src="/static/img/custom/cod-bo-6.webp" alt="base image">
                    </div>
                    <div id="product-images" class="mt-4 grid grid-cols-2 grid-rows-[repeat(2,8rem)] gap-2 sm:grid-cols-4">
                        <div class="w-full p-0.5 rounded-sm cursor-pointer border-2 border-gray-300 dark:border-gray-800">
                            <img class="w-full h-full object-cover object-center" src="/static/img/custom/cod-bo-6.webp" alt="product image 1">
                        </div>
                        <div class="w-full p-0.5 rounded-sm cursor-pointer border-2 border-gray-300 dark:border-gray-800">
                            <img class="w-full h-full object-cover object-center" src="/static/img/custom/cyber.webp" alt="product image 2">
                        </div>
                        <div class="w-full p-0.5 rounded-sm cursor-pointer border-2 border-gray-300 dark:border-gray-800">
                            <img class="w-full h-full object-cover object-center" src="/static/img/custom/rb-six.webp" alt="product image 3">
                        </div>
                        <div class="w-full p-0.5 rounded-sm cursor-pointer border-2 border-gray-300 dark:border-gray-800">
                            <img class="w-full h-full object-cover object-center" src="/static/img/custom/custom1.webp" alt="product image 4">
                        </div>
                    </div>
                </div>
                <div id="product-detail" class="mt-4">
                    <div>
                        <h1 id="product-title">${data.name}</h1>
                        <div class="mt-4 flex items-center text-sm justify-between px-1 min-h-11">
                            <span class="flex flex-col space-y-1">
                                <span class="pl-0.5">
                                    <span id="product-price" class="line-through text-gray-400 dark:text-gray-600">340,000</span>
                                        تومن
                                </span>
                                <span id="product-discount">340,000</span>
                            </span>
                            <span class="bg-primary text-gray-800 rounded-md p-0.5">
                                تخفیف
                                <span id="product-discount-percent">0%</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>`
}

export default productPage;