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

export {customObserver}