import "@/css/style.css"
import "@/js/main/include.js"

const dataPage = document.body.dataset.page

if (dataPage) {
    import(`@/js/pages/${dataPage}.js`)
        .then(mod => {
            if (mod) mod.init()
        })
        .catch((err) => console.error(err))
}