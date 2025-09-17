const createScrollUp = () => {
    const el = document.createElement("a");
    el.id = "scroll-up";
    el.className = "opacity-0 flex items-center justify-center fixed bottom-1 left-1 size-8 bg-info-text rounded-full text-custom-border text-lg transition-all duration-200";
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>
`;
    el.href = "#"

    return el;
}

export {createScrollUp};