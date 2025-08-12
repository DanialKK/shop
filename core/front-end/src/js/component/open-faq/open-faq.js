export const openFAQ = () => {
    const btnFaq = document.querySelectorAll('[data-faq-btn]');

    btnFaq.forEach(btn => btn.addEventListener('click', toggleFaqHandler))
}

const toggleFaqHandler = event => {
    const wrapper = event.target.closest("[data-faq-wrapper]")
    const text = wrapper.querySelector('[data-faq-text]');
    const openIcon = wrapper.querySelector('[data-faq-icon=open]');
    const closeIcon = wrapper.querySelector('[data-faq-icon=close]');

    text.style.cssText = wrapper.dataset.faq === "close" ? "opacity: 1; height: auto;" : "opacity: 0; height: 0;";
    wrapper.dataset.faq = wrapper.dataset.faq === "close" ? "open" : "close";
    openIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
}
