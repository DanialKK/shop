const template = () => {
    return `<form class="flex flex-col gap-5 shadow-2xl p-4 rounded-lg mb-20" onsubmit="(function(e) {e.preventDefault()})(e);">
    <p>نظر خودت رو بنویس</p>
    <textarea placeholder="نوشتن نظر" class="border-2 border-primary-button-bg rounded-lg p-4" name="" id="" cols="30" rows="10"></textarea>
    <button class="primary-btn rounded-sm" type="submit">ثبت نظر</button>
</form>`;
}

export default template;