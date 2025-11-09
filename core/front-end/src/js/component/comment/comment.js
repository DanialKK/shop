const comment = () => {
    return  `
<div class="pt-2">
    <!-- user details -->
    <div class="flex flex-row items-center gap-4 px-2">
        <div class="size-15 rounded-full overflow-hidden">
            <img class="w-full h-full" src="/static/img/custom/rb-six.webp" alt="user profile in comment">
        </div>
        <div class="flex flex-col gap-0.5">
            <span class="flex flex-row items-center gap-1">
                <span class="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow-400" class="size-6 fill-yellow-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>                    
                </span>
                <!-- rate comment -->
                <span>
                    4.5
                </span>
            </span>
            <strong>دکستر مورگان</strong>
        </div>
    </div>
    
    <!-- user comment -->
    <div class="mt-2 p-10 shadow-xl rounded-lg">
        <p>
            کالاف دیوتی بلک آپس 6 جدیدترین نسخه و پایدار ترین نسخه رو از ما بخواهید
            کالاف دیوتی بلک آپس 6 جدیدترین نسخه و پایدار ترین نسخه رو از ما بخواهید
            کالاف دیوتی بلک آپس 6 جدیدترین نسخه و پایدار ترین نسخه رو از ما بخواهید
        </p>
    </div>
</div>`
}

export default comment;