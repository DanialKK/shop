# 🛒 Shop Project

پروژه فروشگاهی با دو بخش مجزا:

- **back-end** → API Django REST Framework و JWT
- **front-end** →  HTML, CSS و Vanilla JS 

---
## شروع سریع

### پیش‌نیازها

- Python 3.10+  
- virtualenv یا هر محیط مجازی دلخواه  
- PostgreSQL یا هر دیتابیس دلخواه (اختیاری، SQLite به صورت پیش‌فرض استفاده می‌شود)

## 🏗️ ساختار پروژه

| برنچ          | محتوا                              |
|---------------|-----------------------------------|
| `back-end`    | کدهای Django (API و احراز هویت)   |
| `front-end`   | کدهای HTML, CSS و JS برای فرانت‌اند|

---

## 🚀 راه‌اندازی بک‌اند

### 1️⃣ کلون و انتخاب برنچ بک‌اند
```bash
git clone https://github.com/DanialKK/shop.git
```
### 2️⃣ نصب وابستگی‌ها و راه‌اندازی
```bash
python -m venv venv
source venv/bin/activate    # مک/لینوکس
venv\Scripts\activate       # ویندوز

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver


```
# Shop API

## API Endpoints

### Category
| Method | URL | Description |
|--------|-----|-------------|
| GET    | `/categories/` | لیست همه دسته‌بندی‌ها |
| POST   | `/categories/` | ساخت دسته‌بندی جدید *(فقط سوپر/استف)* |
| GET    | `/categories/{id}/` | نمایش یک دسته‌بندی خاص |
| PUT    | `/categories/{id}/` | بروزرسانی کامل دسته‌بندی *(فقط سوپر/استف)* |
| PATCH  | `/categories/{id}/` | بروزرسانی بخشی *(فقط سوپر/استف)* |
| DELETE | `/categories/{id}/` | حذف دسته‌بندی *(فقط سوپر/استف)* |

---

### Tag
| Method | URL | Description |
|--------|-----|-------------|
| GET    | `/tags/` | لیست همه تگ‌ها |
| POST   | `/tags/` | ساخت تگ جدید *(فقط سوپر/استف)* |
| GET    | `/tags/{id}/` | نمایش یک تگ خاص |
| PUT    | `/tags/{id}/` | بروزرسانی کامل تگ *(فقط سوپر/استف)* |
| PATCH  | `/tags/{id}/` | بروزرسانی بخشی *(فقط سوپر/استف)* |
| DELETE | `/tags/{id}/` | حذف تگ *(فقط سوپر/استف)* |

---

### Product
| Method | URL | Description |
|--------|-----|-------------|
| GET    | `/products/` | لیست همه محصولات |
| POST   | `/products/` | اضافه کردن محصول *(فقط سوپر/استف)* |
| GET    | `/products/{id}/` | نمایش یک محصول خاص |
| PUT    | `/products/{id}/` | بروزرسانی کامل محصول *(فقط سوپر/استف)* |
| PATCH  | `/products/{id}/` | بروزرسانی بخشی *(فقط سوپر/استف)* |
| DELETE | `/products/{id}/` | حذف محصول *(فقط سوپر/استف)* |

---

### Order
| Method | URL | Description |
|--------|-----|-------------|
| GET    | `/orders/` | لیست سفارش‌های کاربر لاگین شده |
| POST   | `/orders/` | ثبت سفارش جدید |
| GET    | `/orders/{id}/` | نمایش جزئیات سفارش |
| PUT/PATCH | `/orders/{id}/` | ویرایش سفارش *(فقط ادمین)* |
| DELETE | `/orders/{id}/` | حذف سفارش *(فقط ادمین)* |

---

### Order Item
| Method | URL | Description |
|--------|-----|-------------|
| GET    | `/order-items/` | لیست آیتم‌های همه سفارش‌ها *(ادمین)* |
| POST   | `/order-items/` | اضافه کردن آیتم به سفارش *(ادمین)* |
| GET    | `/order-items/{id}/` | نمایش آیتم خاص |
| PUT/PATCH | `/order-items/{id}/` | بروزرسانی آیتم *(ادمین)* |
| DELETE | `/order-items/{id}/` | حذف آیتم *(ادمین)* |

---

### Rating
| Method | URL | Description |
|--------|-----|-------------|
| GET    | `/ratings/` | لیست تمام امتیازها *(ادمین)* |
| POST   | `/ratings/` | ثبت امتیاز برای محصول *(کاربر لاگین شده)* |
| GET    | `/ratings/{id}/` | نمایش یک امتیاز خاص |
| PUT/PATCH | `/ratings/{id}/` | تغییر امتیاز *(فقط همان کاربر یا ادمین)* |
| DELETE | `/ratings/{id}/` | حذف امتیاز *(فقط همان کاربر یا ادمین)* |

## API Authentication

مسیرهای احراز هویت شامل ثبت‌نام، لاگین، خروج و رفرش توکن:

| عملیات            | متد HTTP | مسیر API                  | توضیح                      |
|-------------------|----------|---------------------------|----------------------------|
| ثبت‌نام (Register) | POST     | `/api/auth/register/`      | ارسال نام‌کاربری، ایمیل، رمز عبور و تکرارش |
| لاگین (Login)      | POST     | `/api/auth/login/`         | ارسال نام‌کاربری و رمز عبور، دریافت JWT    |
| رفرش توکن (Refresh Token) | POST | `/api/auth/token/refresh/` | ارسال توکن رفرش برای دریافت توکن دسترسی جدید |
|  خروج (Logout) |POST   |   	`/api/auth/logout/` | ارسال توکن رفرش برای بلاک شدن و پایان جلسه کاربری  |

---

## نمونه درخواست ثبت‌نام

```json
{
  "username": "danial",
  "email": "danial@example.com",
  "password": "123456Aa!",
  "password2": "123456Aa!"
}
```
### نمونه درخواست لاگین
```json
{
  "username": "danial",
  "password": "123456Aa!"
}
```
### نمونه درخواست لاگ اوت و بلاک توکن رفرش 
```json
POST /api/auth/logout/
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "refresh": "<refresh_token>"
}
```
