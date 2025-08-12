const createScrollUp = () => {
    const el = document.createElement("a");
    el.id = "scroll-up";
    el.className = "opacity-0 flex items-center justify-center fixed bottom-1 left-1 size-8 bg-info-text rounded-full text-custom-border text-lg transition-all duration-200";
    el.textContent = "^";
    el.href = "#"

    return el;
}

export {createScrollUp};