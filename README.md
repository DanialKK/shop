# 🛒 Shop Project

پروژه فروشگاهی با دو بخش مجزا:

- **back-end** → API Django REST Framework و JWT
- **front-end** →  HTML, CSS و Vanilla JS 

---

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
### API روی http://127.0.0.1:8000 اجرا می‌شود.
