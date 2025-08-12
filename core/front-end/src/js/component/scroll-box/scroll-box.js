export const scrollBoxHandler = (children, btn, data) => {
    // buttons scroll
    btn.forEach(b => b.addEventListener("click", scrollBox.bind(null, children, b, btn, data)))
}

const scrollBox = (child, buttons, allBtn, data) => {
    allBtn.forEach(btn => {
        btn.style.background = "#E6E6E6";
    })

    child.forEach((box, i) => {
        if (+buttons.dataset.scrollIndex - 1 === +i) {
            document.querySelector(`[data-scroll-box-wrapper-${data}]`).scrollTo({
                left: child[i].offsetLeft - document.querySelector(`[data-scroll-box-wrapper-${data}]`).offsetLeft,
                behavior: 'smooth'
            })
            buttons.style.backgroundColor = "#4D4D4D"
        }
    })
}