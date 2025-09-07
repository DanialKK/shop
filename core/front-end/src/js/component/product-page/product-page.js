import {formatToPrice} from "@/js/main/main.js";

const productPage = data => {
    const price = formatToPrice(parseInt(data?.price))
    const discount = +data?.discount_percent;
    const priceDiscount = formatToPrice(parseInt(data?.discounted_price))

    return `
<div data-id="1" class="bg-card-bg rounded-xl border-b-custom-border py-6 container">
    <!-- product gallery -->
    <div>
        <div class="rounded-sm overflow-hidden">
            <img src="/static/img/custom/cod-bo-6.webp" alt="base image">
        </div>
        <div class="mt-4 grid grid-cols-2 grid-rows-[repeat(2,8rem)] gap-2 sm:grid-cols-4">
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
   
    <!-- product details -->
    <div class="mt-4">
        
        <div>
            <!-- prodcut name -->
            <h1 id="product-title">${data.name}</h1>
            
            <!-- product price and discount -->
            <div class="mt-4 flex items-center text-sm justify-between px-1 min-h-11">
                <span class="flex flex-col space-y-1">
                
                    <!-- prodcut price -->
                    <span class="pl-0.5">
                        <span id="product-price" class="line-through text-gray-400 dark:text-gray-600">
                            ${price}
                        </span>
                        تومن
                    </span>
                    
                    <!-- prodcut price after discount -->
                    <span style="display: ${discount ? 'inline-block' : 'none'};">
                        ${priceDiscount}
                    </span>
                </span>
                
                <!-- prodcut discount -->
                <span style="display: ${discount ? 'inline-block' : 'none'};" class="bg-primary text-gray-800 rounded-md p-0.5">
                    تخفیف
                    <span id="product-discount-percent">
                        ${discount}%
                    </span>
                </span>
            </div>
        </div>
    </div>
</div>
`}


export default productPage;