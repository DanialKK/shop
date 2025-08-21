const customObserver = (elem, runCallback, offCallback, rt = null, thr = 0, rtMg = "0px") => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCallback()
            } else {
                offCallback()
            }
        })
    }, {
        root: rt,
        threshold: thr,
        rootMargin: rtMg
    })

    observer.observe(elem);
}

function formatToPrice(value) {
    const raw = String(value).replace(/\D/g, "");
    if (!raw) return "";
    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function createProductBox(data) {
    const wrapper = document.createElement("div");
    wrapper.className = "p-4 w-full max-w-85 rounded-2xl bg-card-bg";
    wrapper.setAttribute("data-product-id", data.id);

    // img
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "min-h-40";
    const img = document.createElement("img");
    img.src = data.image;
    img.alt = data.name;
    img.className = "rounded-2xl w-full";
    imgWrapper.appendChild(img);
    wrapper.appendChild(imgWrapper);

    // price and discount
    const priceWrapper = document.createElement("div");
    priceWrapper.className = "flex items-center text-sm justify-between mt-3 px-1 min-h-11";

    const priceBox = document.createElement("span");
    priceBox.className = "flex flex-col space-y-1";

    // price
    const originalPrice = document.createElement("span");
    originalPrice.className = "pl-0.5";
    originalPrice.innerHTML = `<span data-product-price>${formatToPrice(parseInt(data.price))}</span> تومن`;
    priceBox.appendChild(originalPrice);

    // price after discount
    if (data.discount) {
        const calcOfferPrice = data.price - (data.price * data.discount / 100);
        const offerPrice = document.createElement("span");
        offerPrice.setAttribute("data-product-offer-price", "");
        offerPrice.textContent = formatToPrice(parseInt(String(calcOfferPrice)));
        priceBox.appendChild(offerPrice);
    }

    priceWrapper.appendChild(priceBox);

    // discount
    if (data.discount) {
        const discountSpan = document.createElement("span");
        discountSpan.className = "bg-primary text-gray-800 rounded-md p-0.5";
        discountSpan.innerHTML = `تخفیف <span data-product-offer>${data.discount || 0}%</span>`;
        originalPrice.querySelector("[data-product-price]").className = "line-through text-gray-400 dark:text-gray-600";
        priceWrapper.appendChild(discountSpan);
    }

    wrapper.appendChild(priceWrapper);

    // wrapper info
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "bg-content-bg mt-4 space-y-3 rounded-2xl p-3";

    // name
    const title = document.createElement("h4");
    const titleLink = document.createElement("a");
    titleLink.href = "#";
    titleLink.setAttribute("data-product-name", "");
    titleLink.className = "hover:text-green-600 hover:decoration-solid hover:underline";
    titleLink.textContent = data.name;
    title.appendChild(titleLink);
    contentWrapper.appendChild(title);

    // rate and favorite
    const ratingWrapper = document.createElement("div");
    ratingWrapper.className = "flex items-center justify-between px-1 mt-2";

    const ratingBox = document.createElement("span");
    ratingBox.className = "flex items-center justify-center gap-0.5";
    ratingBox.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow-400" class="size-6 fill-yellow-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
        </svg>
        <span data-product-average-rate>${data.average_rating || "0"}</span>
    `;
    ratingWrapper.appendChild(ratingBox);

    const heartSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    heartSvg.setAttribute("data-add-to-favorite", "false");
    heartSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    heartSvg.setAttribute("fill", "none");
    heartSvg.setAttribute("viewBox", "0 0 24 24");
    heartSvg.setAttribute("stroke-width", "1.5");
    heartSvg.setAttribute("stroke", "");
    heartSvg.classList.add("size-6", "stroke-red-600", "cursor-pointer");
    heartSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>`;
    ratingWrapper.appendChild(heartSvg);

    contentWrapper.appendChild(ratingWrapper);

    // category
    const categoryP = document.createElement("p");
    categoryP.className = "sub-text text-sm font-normal text-gray-600 dark:text-gray-400";
    categoryP.innerHTML = `دسته بندی: <a href="" class="hover:text-green-600 hover:decoration-solid hover:underline font-medium">${data.category_detail.name}</a>`;
    contentWrapper.appendChild(categoryP);

    // description
    const summaryP = document.createElement("p");
    summaryP.setAttribute("data-product-summary", "");
    summaryP.className = "text-sm/5.5 min-h-16.5 font-normal line-clamp-3 mt-4";
    summaryP.textContent = data.description;
    contentWrapper.appendChild(summaryP);

    wrapper.appendChild(contentWrapper);

    // add to cart btn
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "bg-content-bg mt-4 rounded-2xl p-3";

    // stock and to cart btn wrapper
    const btnStockWrapper = document.createElement("div");
    btnStockWrapper.className = "flex items-center justify-between flex-wrap gap-2 max-xs:gap-4";

    // stock
    const stock = document.createElement("p");
    stock.className = "min-w-20 sub-text text-gray-600 dark:text-gray-400";
    stock.innerHTML = `موجودی: <span>${data.stock}</span>`
    btnStockWrapper.appendChild(stock);

    // add to cart btn
    const btn = document.createElement("button");
    btn.setAttribute("data-product-btn-add-to-cart", "false");
    btn.className = "primary-btn flex items-center gap-0.5";
    btn.innerHTML = `<span data-prodcut-text-add-to-cart class="text-sm font-normal">افزودن به سبد خرید</span>
                     <svg data-product-icon-add-to-cart="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                     </svg>`;
    btnStockWrapper.appendChild(btn);
    btnWrapper.appendChild(btnStockWrapper);

    // tags
    const tagsDiv = document.createElement("div");
    tagsDiv.setAttribute("data-product-tags", "");
    tagsDiv.className = "flex flex-wrap gap-1 mt-4 *:text-sm *:font-normal *:hover:text-green-600 *:hover:decoration-solid *:hover:underline *:cursor-pointer";

    data.tags_detail.forEach(tag => {
        const tagLink = document.createElement("a");
        tagLink.href = "#";
        tagLink.textContent = `#${tag.name}`;
        tagsDiv.appendChild(tagLink);
    });

    btnWrapper.appendChild(tagsDiv);
    wrapper.appendChild(btnWrapper);

    return wrapper;
}

export {customObserver, createProductBox, formatToPrice}