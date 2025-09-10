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

export {customObserver, formatToPrice}