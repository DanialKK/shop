🛍️ Shop Project – Front-End

فرانت‌اند پروژه فروشگاهی با ساختار ماژولار، طراحی واکنش‌گرا، و ارتباط امن با API بک‌اند Django.  
این بخش با استفاده از Vite توسعه داده شده و شامل چند ورودی مستقل برای صفحات مختلف است: main, shop, admin.

---

⚙️ تکنولوژی‌های استفاده‌شده

- HTML, TailwindCss 4 and JavaScript (Vanilla)  
- Vite برای توسعه سریع و بیلد بهینه  
- Tailwind CSS با پیکربندی مستقیم در Vite  
- JWT Authorization برای ارتباط امن با بک‌اند  
- ساختار ماژولار با تفکیک کامل صفحات، کامپوننت‌ها و API  

---

🚀 راه‌اندازی فرانت‌اند

```bash
git clone --single-branch --branch front-end https://github.com/DanialKK/shop.git
npm install
npm run dev
```

📡 پروژه روی http://localhost:3000 اجرا می‌شود  
🔗 درخواست‌های /api به صورت پراکسی به http://127.0.0.1:8000 هدایت می‌شوند

---

🏗️ تنظیمات Vite

فایل vite.config.js شامل موارد زیر است:

| بخش       | توضیح                                                                     |
|-----------|----------------------------------------------------------------------------|
| ورودی‌ها   | index.html ← صفحه اصلی<br>shop/index.html ← فروشگاه<br>admin/index.html ← پنل مدیریت |
| alias     | تعریف مسیر @ → src/                                                      |
| Tailwind  | اتصال مستقیم با پلاگین رسمی                                              |
| پراکسی     | /api → http://127.0.0.1:8000                                              |
| سرور      | اجرا روی 0.0.0.0:3000 برای دسترسی شبکه‌ای                                |

### نمونه تنظیمات

```js
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
```

---

🧱 بیلد پروژه

برای ساخت نسخه نهایی و پیش نمایش:

```bash
npm run build
npm run preview
```
