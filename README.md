# 🛍️ Shop Project – Front-End

فرانت‌اند پروژه فروشگاهی با ساختار ماژولار، طراحی واکنش‌گرا، و ارتباط امن با API بک‌اند Django. این بخش با استفاده از **Vite** توسعه داده شده و شامل چند ورودی مستقل برای صفحات مختلف است: **main**, **shop**, **admin**.

---

## ⚙️ تکنولوژی‌های استفاده‌شده

- **HTML, CSS, JavaScript (Vanilla)**
- **Vite** برای توسعه سریع و بیلد بهینه
- **Tailwind CSS** با پیکربندی مستقیم در Vite
- **JWT Authorization** برای ارتباط امن با بک‌اند
- ساختار ماژولار با تفکیک کامل صفحات، کامپوننت‌ها و API

---

## 🚀 راه‌اندازی فرانت‌اند

```bash
git clone https://github.com/DanialKK/shop.git
git checkout front-end
npm install
vite


📡 پروژه روی http://localhost:3000 اجرا می‌شود
🔗 درخواست‌های /api به صورت پراکسی به http://127.0.0.1:8000 هدایت می‌شوند


🏗️ تنظیمات Vite
فایل vite.config.js شامل موارد زیر است:

تعریف چند ورودی مستقل:

index.html ← صفحه اصلی

shop/index.html ← فروشگاه

admin/index.html ← پنل مدیریت

تعریف alias برای مسیر @ → src/

اتصال مستقیم Tailwind CSS با پلاگین رسمی

پراکسی /api به بک‌اند Django روی پورت 8000

اجرای سرور روی 0.0.0.0:3000 برای دسترسی شبکه‌ای

server: {
  host: '0.0.0.0',
  port: 3000,
  proxy: {
    "/api": {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
      secure: false,
    }
  }
}

🧱 بیلد پروژه
برای ساخت نسخه نهایی:
vite build

