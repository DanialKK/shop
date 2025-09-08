// @ts-check

"use strict";

import {formatToPrice} from "@/js/main/main.js";

const productPage = (data) => {
    /**
     * @param {{
     * price: string,
     * discounted_price: string,
     * discount_percent: number,
     * average_rating: number,
     * category_detail: string,
     * stock: string,
     * tags_detail: array,
     * }} data
     */

    const price = formatToPrice(parseInt(data?.price))
    const discount = +data?.discount_percent;
    const priceDiscount = formatToPrice(parseInt(data?.discounted_price))

    const tags = data?.tags_detail.map(tag => `<a href="" class="sub-text">#${tag.name.replace(" ", "_")}</a>`);

    return `
<div data-id="1" class="bg-card-bg rounded-xl border-b-custom-border pb-6 overflow-hidden mx-auto w-11/12 xs:max-w-130 md:max-w-320 md:flex md:flex-row-reverse md:justify-between md:pt-6">
    <!-- product gallery --> 
    <div class="basis-5/12 md:pl-4">
        <!-- base image -->
        <div class="overflow-hidden md:rounded-sm">
            <img data-base-img src="/static/img/custom/cod-bo-6.webp" alt="base image">
        </div>
        
        <!-- all images -->
        <div class="px-4 mt-4 grid grid-cols-2 grid-rows-[repeat(2,8rem)] gap-2 sm:grid-rows-1 sm:grid-cols-4 md:px-0 md:grid-cols-2 md:grid-rows-[repeat(2,12rem)]">
            <div class="w-full p-0.5 rounded-sm cursor-pointer border-2 border-gray-300 dark:border-gray-800">
                <img data-all-img class="w-full h-full object-cover object-center" src="/static/img/custom/cod-bo-6.webp" alt="product image 1">
            </div>
            <div class="w-full p-0.5 rounded-sm cursor-pointer border-2 border-gray-300 dark:border-gray-800">
                <img data-all-img class="w-full h-full object-cover object-center" src="/static/img/custom/cyber.webp" alt="product image 2">
            </div>
            <div class="w-full p-0.5 rounded-sm cursor-pointer border-2 border-gray-300 dark:border-gray-800">
                <img data-all-img class="w-full h-full object-cover object-center" src="/static/img/custom/rb-six.webp" alt="product image 3">
            </div>
            <div class="w-full p-0.5 rounded-sm cursor-pointer border-2 border-gray-300 dark:border-gray-800">
                <img data-all-img class="w-full h-full object-cover object-center" src="/static/img/custom/custom1.webp" alt="product image 4">
            </div>
        </div>
    </div>
   
    <!-- product details -->
    <div class="mt-8 px-4 basis-6/12 md:mt-0">
    
        <!-- prodcut name and category -->
        <div>
            <!-- prodcut name -->
            <h2 id="product-title" class="mb-6">${data.name}</h2>
            
            <!-- prodcut category -->
            <p class="font-normal text-gray-600 dark:text-gray-400">
                دسته بندی:
                <a href="" class="text-custom-text font-medium hover:text-green-600 hover:decoration-solid hover:underline">
                    ${data.category_detail.name}
                </a>
            </p>
        </div>
        
        <!-- prodcut price and discount -->
        <div class="tracking-wide flex items-center justify-between border-top-light px-1 min-h-11">
            <span class="flex flex-col space-y-1">
           
                <!-- prodcut price -->
                <span>
                    <span id="product-price" class="line-through text-gray-400 dark:text-gray-600 pl-2">
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

        <!-- prodcut rate and favorite -->        
        <div class="flex flex-row items-center justify-between mt-6">
        
            <!-- prodcut rate and star icon -->
            <span class="flex flex-row items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow-400" class="size-6 fill-yellow-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
        </svg>
                    
                <span class="text-sub-text text-sm">
                    ${+data?.average_rating || "بدون رای"}
                </span>
            </span>
            
            <!-- prodcut favorite icon -->
            <span>
                <svg data-add-to-favorite="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="" class="size-6 stroke-red-600 cursor-pointer"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path></svg>
            </span>
        </div>

        <!-- prodcut description -->
        <div class="mt-8">
            <h3>توضیحات:</h3>
            <p class="mt-3 text-sub-text text-sm">${data?.description}</p>
        </div>
        
        <!-- prodcut count and add to cart -->
        <div class="border-top-light mt-6 xs:flex flex-row items-center justify-between gap-1.5">
        
            <!-- prodcut count -->
            <p class="sub-text">
                موجودی: 
                <span class="text-base text-custom-text">${data.stock}</span>
                   عدد 
            </p>
            
            <!-- prodcut add to cart -->
            <div class="max-w-max mt-4 xs:mt-0">
                <a href="/product/?id=1" class="primary-btn flex items-center gap-0.5">
                    <span data-prodcut-text-add-to-cart="" class="text-sm font-normal">
                        افزودن به سبد خرید
                    </span>
                    
                    <svg data-product-icon-add-to-cart="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
                    </svg>
                </a>
            </div>
        </div>
        
        <!-- prodcut tags -->
        <div class="border-top-light">
            <h5>تگ ها:</h5>
            <div class="flex flex-wrap gap-1 mt-2 *:text-sm *:font-normal *:hover:text-green-600 *:hover:decoration-solid *:hover:underline *:cursor-pointer">
                ${tags.join("")}
            </div>
        </div>
    </div>
</div>`
}

export default productPage;