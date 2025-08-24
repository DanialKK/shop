import {handleCreateCategory, handleCreateTag, handleGetAllCategories, handleGetAllTag, handleCreateNewProduct} from "@/js/api/auth.js";
import {serverDisconnect, tokenControl} from "@/js/api/api-utils.js";
import {formatToPrice} from "@/js/main/main.js"

const renderAdminPanel = () => {
    const app = document.getElementById("app")
    const getAccessToken = tokenControl.accessToken

    if (getAccessToken) {
        app.innerHTML = `<section id="panel">
<div class="container">
  <div class="text-center mb-4">
    <h1 class="mx-auto">
        پنل مدیریت
    </h1>
    <h2 id="session"></h2>
  </div>
  <div class="flex flex-col items-center gap-4">
<!-- add category -->
  <form id="create-category-form" class="w-full max-w-200 bg-card-bg p-4 rounded shadow">
    <h2 class="text-lg font-bold my-4 text-center">افزودن دسته‌بندی جدید</h2>
    <h3 data-success-message class="my-4 text-green-800 dark:text-green-600 mx-auto text-center"></h3>

    <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
      <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">نام دسته‌بندی</span>
      <input type="text" id="category-name" class="w-8/10 input-field border border-sub-text rounded p-2" placeholder="مثلاً کتاب" required />
    </label>
    <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
      <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">شناسه کوتاه (slug)</span>
      <input type="text" id="category-slug" class="w-8/10 input-field border border-sub-text rounded p-2" placeholder="مثلاً book" required />
    </label>
    <p data-error-message class="text-red-700 dark:text-red-500"></p>
    <button type="submit" class="primary-btn w-full">اضافه کردن دسته‌بندی</button>
  </form>
  
<!-- add tags -->
  <form id="create-tag-form" class="w-full max-w-200 bg-card-bg p-4 rounded shadow mt-8">
  <h2 class="text-lg font-bold mb-4 text-center">افزودن برچسب جدید</h2>
  <h3 data-success-message class="my-4 text-green-800 dark:text-green-600 mx-auto text-center"></h3>

  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">نام برچسب</span>
    <input type="text" id="tag-name" class="w-8/10 input-field border border-sub-text rounded p-2" placeholder="مثلاً تخیلی" required />
  </label>
  <p data-error-message class="text-red-700 dark:text-red-500"></p>
  <button type="submit" class="primary-btn w-full">اضافه کردن برچسب</button>
</form>

<!-- create new product -->
<form id="create-product-form" class="w-full max-w-200 bg-card-bg p-4 rounded shadow mt-8">
  <h2 class="text-lg font-bold mb-4 text-center">افزودن محصول جدید</h2>
  <h3 data-success-message class="my-4 text-green-800 dark:text-green-600 mx-auto text-center"></h3>

  <!-- product name -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">نام محصول</span>
    <input type="text" id="product-name" class="w-8/10 input-field border border-sub-text rounded p-2" placeholder="مثلاً کتاب افسانه‌ای" required />
  </label>
 <!-- product slug -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">slug</span>
    <input type="text" id="product-slug" class="w-8/10 input-field border border-sub-text rounded p-2" placeholder="مثلاً fantasy-book" required />
  </label>

  <!-- description -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">توضیحات</span>
    <textarea id="product-description" class="w-8/10 input-field border border-sub-text rounded p-2" placeholder="توضیح کوتاه درباره محصول" required></textarea>
  </label>

  <!-- price -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">قیمت (تومان)</span>
    <input type="text" id="product-price" class="w-8/10 input-field border border-sub-text rounded p-2" placeholder="مثلاً 12,0000" required min="0" dir="rtl"/>
  </label>

  <!-- inventory -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">موجودی</span>
    <input type="number" id="product-inventory" class="w-8/10 input-field border border-sub-text rounded p-2" placeholder="مثلاً 10" required min="0" />
  </label>

  <!-- category -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">دسته‌بندی</span>
    <select id="product-category" class="w-8/10 input-field border border-sub-text rounded p-2" required>
      <option class="bg-custom-bg text-custom-text" value="">انتخاب دسته‌بندی</option>
    </select>
  </label>

  <!-- tags -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">برچسب‌ها</span>
    <select id="product-tags" multiple class="w-8/10 input-field border border-sub-text rounded p-2"></select>
  </label>

  <p data-error-message class="text-red-700 dark:text-red-500"></p>
  <button type="submit" class="primary-btn w-full">اضافه کردن محصول</button>
</form>
</div>
</div>
</section>`
        bindEvent()
    } else {
        app.innerHTML = `<div class="flex justify-center items-center flex-col gap-8">
    <h2 class="mx-auto text-center">هنوز وارد نشدید، لطفا ابتدا وارد شوید</h2>
    <a data-spa-account-links href="/account/login" class="primary-btn">ورود</a>
</div>`
    }
}

const bindEvent = () => {
    const createFormCategory = document.getElementById("create-category-form");
    const createTagForm = document.getElementById("create-tag-form");
    const priceInput = document.getElementById("product-price");
    const createProductForm = document.getElementById("create-product-form");

    // add category
    createFormCategory.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("category-name").value.trim();
        const slug = document.getElementById("category-slug").value.trim();
        const successMessage = e.currentTarget.querySelector("[data-success-message]")
        const textError = e.currentTarget.querySelector("[data-error-message]")

        if (!name || !slug) {
            textError.textContent = "لطفاً هر دو فیلد را پر کنید.";
            return;
        }

        try {
            const res = await handleCreateCategory(name, slug);
            console.log("server response: ", res);
            successMessage.textContent = "دسته بندی با موفقیت اضافه شد"
            textError.textContent = "";
            createFormCategory.reset();
        } catch (err) {
            successMessage.textContent = ""
            if (err instanceof TypeError) {
                serverDisconnect(textError)
            } else {
                console.error("Error: ", err);
                textError.textContent = err.message;
            }
        }
    });

    // add tags
    createTagForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("tag-name").value.trim().replace(" ", "_");
        const successMessage = e.currentTarget.querySelector("[data-success-message]");
        const textError = e.currentTarget.querySelector("[data-error-message]");

        if (!name) {
            textError.textContent = "لطفاً هر دو فیلد را پر کنید.";
            return;
        }

        try {
            const res = await handleCreateTag(name);
            console.log("✅ پاسخ سرور:", res);
            successMessage.textContent = "برچسب با موفقیت اضافه شد";
            textError.textContent = "";
            createTagForm.reset();
        } catch (err) {
            successMessage.textContent = "";
            if (err instanceof TypeError) {
                serverDisconnect(textError);
            } else {
                console.error("❌ خطا:", err);
                textError.textContent = err.message;
            }
        }
    });

    // get all categories
    (async () => {
        const selectProductCategory = document.getElementById("product-category");

        try {
            const res = await handleGetAllCategories();
            addAllCategoriesToDOM(res)
        } catch (e) {
            console.log(e)
            if (e instanceof TypeError) {
                console.log("server not response: ", e)
            } else {
                console.error(e);
            }
        }

        function addAllCategoriesToDOM(categories) {
            const fragment = document.createDocumentFragment();
            categories.forEach(category => {
                const option = document.createElement("option");
                option.className = "bg-custom-bg text-custom-text"
                option.value = category.id;
                option.dataset.categorySlug = category.slug;
                option.textContent = category.name;
                fragment.appendChild(option);
            })
            selectProductCategory.appendChild(fragment);
        }
    })();

    // get all tags
    (async () => {
        const selectProductTags = document.getElementById("product-tags");

        try {
            const res = await handleGetAllTag();
            addAllTagsToDOM(res)
        } catch (e) {
            if (e instanceof TypeError) {
                console.log("server not response: ", e);
            } else {
                console.error(e);
            }
        }

        function addAllTagsToDOM(tags) {
            const fragment = document.createDocumentFragment();
            tags.forEach(tag => {
                const option = document.createElement("option");
                option.className = "text-custom-text"
                option.value = tag.id;
                option.textContent = tag.name;
                fragment.appendChild(option);
            })
            selectProductTags.appendChild(fragment);
        }
    })()

    // when typing price, add comma between number in debounce function
    function debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    const handlePriceInput = debounce(() => {
        const value = priceInput.value.trim();
        priceInput.value = formatToPrice(value);
    }, 400);
    priceInput.addEventListener("input", handlePriceInput);

    createProductForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("product-name").value.trim();
        const slug = document.getElementById("product-slug").value.trim();
        const description = document.getElementById("product-description").value.trim();
        const priceRaw = document.getElementById("product-price").value.replace(/\D/g, ""); // just get numbers
        const stock = Number(document.getElementById("product-inventory").value);
        const categoryField = document.getElementById("product-category").selectedOptions[0]
        const category = Number(categoryField.value);
        const tagsSelect = document.getElementById("product-tags").selectedOptions;
        const selectedTags = Array.from(tagsSelect).map(opt => Number(opt.value));
        const successMessage = createProductForm.querySelector("[data-success-message]");
        const errorMessage = createProductForm.querySelector("[data-error-message]");

        if (!name || !slug || !description || !priceRaw || !stock || !category) {
            errorMessage.textContent = "لطفاً همه فیلدهای ضروری را پر کنید.";
            successMessage.textContent = "";
            return;
        }

        const productData = {
            name,
            slug,
            description,
            price: Number(priceRaw),
            stock,
            category,
            tags: selectedTags
        };

        try {
            const res = await handleCreateNewProduct(productData);
            console.log("✅ محصول ساخته شد:", res);
            successMessage.textContent = "محصول با موفقیت اضافه شد!";
            errorMessage.textContent = "";
            createProductForm.reset();
        } catch (err) {
            successMessage.textContent = "";
            if (err instanceof TypeError) {
                serverDisconnect(errorMessage);
            } else {
                console.error("❌ خطا:", err);
                errorMessage.textContent = err.message;
            }
        }
    })
}

export {renderAdminPanel}
