🛍️ Shop Project – فرانت‌اند
فرانت‌اند پروژه فروشگاهی با ساختار ماژولار، طراحی واکنش‌گرا، و ارتباط امن با API بک‌اند Django. این بخش با استفاده از Vite توسعه داده شده و شامل چند ورودی مستقل برای صفحات مختلف (main، shop، admin) است.

⚙️ تکنولوژی‌های استفاده‌شده
HTML, CSS, JavaScript (Vanilla)

Vite برای توسعه سریع و بیلد بهینه

Tailwind CSS با پیکربندی مستقیم در Vite

JWT Authorization برای ارتباط امن با بک‌اند

ساختار ماژولار با تفکیک کامل صفحات، کامپوننت‌ها، و API

📁 ساختار پروژه
plaintext
src/
├── css/               ← استایل‌های اصلی پروژه
├── js/
│   ├── admin/         ← اسکریپت‌های پنل مدیریت
│   ├── api/           ← ارتباط با API بک‌اند
│   ├── component/     ← کامپوننت‌های قابل استفاده مجدد
│   ├── main/          ← اسکریپت‌های صفحه اصلی
│   └── pages/         ← صفحات مستقل پروژه
├── entry.js           ← نقطه ورود پروژه برای Vite
public/
└── static/            ← تصاویر و آیکون‌ها
🚀 راه‌اندازی فرانت‌اند
1️⃣ کلون و انتخاب برنچ فرانت‌اند:

bash
git clone https://github.com/DanialKK/shop.git
git checkout front-end
2️⃣ نصب وابستگی‌ها:

bash
npm install
3️⃣ اجرای پروژه:

bash
vite
📡 پروژه روی http://localhost:3000 اجرا می‌شود 🔗 درخواست‌های /api به صورت پراکسی به http://127.0.0.1:8000 هدایت می‌شوند

🏗️ تنظیمات Vite
فایل vite.config.js شامل موارد زیر است:

تعریف چند ورودی مستقل:

index.html برای صفحه اصلی

shop/index.html برای فروشگاه

admin/index.html برای پنل مدیریت

تعریف alias برای مسیر @ → src/

اتصال مستقیم Tailwind CSS با پلاگین رسمی

پراکسی /api به بک‌اند Django روی پورت 8000

اجرای سرور روی 0.0.0.0:3000 برای دسترسی شبکه‌ای

js
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

bash
vite build
📦 خروجی بیلد در پوشه dist/ قرار می‌گیرد 💡 هر ورودی مستقل (shop، admin، main) به صورت جداگانه بیلد می‌شود
