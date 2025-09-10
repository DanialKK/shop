# 🛍️ Shop Project — Full Stack E-Commerce Platform

پروژه فروشگاهی کامل با دو بخش مجزا:

- **Front-End** → توسعه‌ی رابط کاربری با HTML, CSS, JavaScript و Vite  
- **Back-End** → توسعه‌ی API با Django REST Framework و JWT Authentication

---

## 📦 ساختار پروژه

```
shop/
├── core/
│   ├── front-end/       # رابط کاربری با Vite و Tailwind
│   └── back-end/        # API با Django و DRF
├── README.md            
```

هر پوشه شامل README اختصاصی خودش هست برای جزئیات بیشتر.

---

## 🚀 راه‌اندازی سریع

### 🔹 کلون پروژه

```bash
git clone https://github.com/DanialKK/shop.git
```

---

### 🔹 راه‌اندازی Front-End

```bash
cd shop/core/front-end
npm install
npm run dev
```

📡 اجرا روی `http://localhost:3000`  
🔗 درخواست‌های `/api` به صورت پراکسی به `http://127.0.0.1:8000` هدایت می‌شوند

---

### 🔹 راه‌اندازی Back-End

```bash
cd shop/core/back-end
python -m venv venv
source venv/bin/activate  # مک/لینوکس
venv\Scripts\activate     # ویندوز

pip install -r requirements.txt
py manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

📡 اجرا روی `http://127.0.0.1:8000`

---

## ⚙️ تکنولوژی‌های استفاده‌شده

### Front-End

- HTML, CSS, JavaScript (Vanilla)
- Vite برای توسعه سریع و بیلد بهینه
- Tailwind CSS با پیکربندی مستقیم
- JWT Authorization برای ارتباط امن با بک‌اند
- ساختار ماژولار با ورودی‌های مستقل: `main`, `shop`, `admin`

### Back-End

- Django 4.x
- Django REST Framework
- JWT Authentication
- SQLite (پیش‌فرض) یا PostgreSQL
- مدیریت کاربران، محصولات، سفارش‌ها، امتیازها

---

## 📡 API Overview

### Auth

| عملیات    | مسیر                            | توضیح               |
|-----------|---------------------------------|---------------------|
| ثبت‌نام   | `POST /api/auth/register/`      | ایجاد حساب کاربری   |
| لاگین     | `POST /api/auth/login/`         | دریافت JWT          |
| رفرش توکن | `POST /api/auth/token/refresh/` | دریافت توکن جدید    |
| خروج      | `POST /api/auth/logout/`        | بلاک‌کردن توکن رفرش |

### Resources

| مدل       | مسیر پایه           | عملیات               |
|-----------|---------------------|----------------------|
| Category  | `/api/categories/`  | CRUD (فقط مدیر)      |
| Tag       | `/api/tags/`        | CRUD (فقط مدیر)      |
| Product   | `/api/products/`    | CRUD + افزودن تصویر  |
| Order     | `/api/orders/`      | ثبت و مشاهده سفارش   |
| OrderItem | `/api/order-items/` | مدیریت آیتم‌ها       |
| Rating    | `/api/ratings/`     | امتیازدهی به محصولات |

---

## 🧱 بیلد و پیش‌نمایش فرانت‌اند

```bash
npm run build
npm run preview
```

---

## 📌 نکات مهم

- برای توسعه، از برنچ‌های `front-end` و `back-end` استفاده کنید  
- برای فیچرهای جدید، برنچ‌های `feature/...` بسازید و بعد از بررسی، PR بزنید به `development`  
- برای انتشار نهایی، فقط از `master` استفاده شود

---

## 👨‍💻 توسعه‌دهنده ها

- GitHub: [@DanialKK](https://github.com/DanialKK)
- GitHub: [@homow](https://github.com/homow)

---

> Made with ❤️ by Homow & DanialKK — Modular, Secure, and Scalable
