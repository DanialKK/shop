const createScrollUp = () => {
    const el = document.createElement("a");
    el.className = "hidden items-center justify-center fixed bottom-1 left-1 size-8 bg-info-text rounded-full text-custom-border text-lg";
    el.id = "scroll-up";
    el.textContent = "^";
    el.href = "#"

    return el;
}

export {createScrollUp};