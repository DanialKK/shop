# 📄 Git Workflow – پروژه Shop

یک راهنمای کامل برای کار با گیت در پروژه Shop، مخصوص توسعه‌دهندگان تیم.

---

## 1️⃣ کلون کردن مخزن

ابتدا ریپوی اصلی رو کلون کنید:

```bash
git clone https://github.com/DanialKK/shop.git
cd shop
```

> 🔹 به طور پیش‌فرض همه برنچ‌ها دانلود می‌شن، ولی روی `default branch` (معمولاً `master` یا `development`) قرار می‌گیرید.  
> 🔹 برای دیدن برنچ‌های موجود:

```bash
git branch -a
```

---

## 2️⃣ برنچ‌های اصلی پروژه

| برنچ          | توضیح                              |
|---------------|------------------------------------|
| `master`      | نسخه پایدار (Release) ✅            |
| `development` | توسعه فعال (آخرین تغییرات اصلی) 🛠 |

---

## 3️⃣ ساخت برنچ جدید

### برای فیچر یا باگ:

- همیشه **از `development` برنچ بزنید** (نه از `master`)
- نام‌گذاری استاندارد:
  - فیچر: `feature/feature-name` ✨
  - باگ: `bugfix/bug-description` 🐞

مثال:

```bash
git checkout development
git pull origin development
git checkout -b feature/user-panel
```

---

## 4️⃣ کار روی برنچ

### ذخیره‌سازی  موقت 

اگر تغییرات داری و می‌خوای پوش کنی، قبلش حتما آخرین تغییرات رو از development بگیر:

```bash
git stash -m "WIP: message"
```

تغییرات موقتا ذخیره شدن، وقتشه از development بگیری:

```bash
git checkout feature/user-panel
git fetch origin
git merge origin/development
```

---

## 5️⃣ چک کردن کانفلیکت 

```bash
git status      # چک کردن کانفلیکت
# اگر کانفلیکت وجود نداشت برید مرحله 6 در غیر اینصورت برید ادامه دستورات در پایین
# اگر کانفلیکت وجود داشت:
#   1. فایل‌ها رو دستی اصلاح کن
#   2. بعد از اصلاح:
git add .
git commit
```

---

## 6️⃣ پوش کردن به برنچ جدید

```bash
git stash pop       # در آوردن تغییرات از stash
git status          # چک کردن دوباره
git add .
git commit -m "message"
git push origin feature/user-panel
```

---

## 7️⃣ به برنچ development یک PR میزنیم در وب و بعداز بررسی، مرج میکنیم

### اول) pr به `development` و بعد از بررسی، merge شود 

```
از طریق وبسایت گیتهاب، یک pr بزنید به development و بعد از بررسی merge میشه
ترجیحا برنچی که ساختید حذف میشه بعد از merge
```

### دوم) آپدیت `development`

```bash
git fetch --all --prune    # برنچ هایی که در repo حذف شدن در لوکال هم حذف میشن
git checkout development
git pull origin development
```

---

## 8️⃣ بعد از مدتی و رسیدن به نسخه پایدار، pr و merger به `master` 

### اول) pr به `master` و بعد از بررسی، merge شود 

```
بعد از بررسی و در صورت ایجاد شدن نسخه پایدار، master هم آپدیت میکنیم با pr و merge
```

### دوم) آپدیت `master`

```bash
git fetch --all --prune
git checkout master
git pull origin master
```

---

## 8️⃣ سناریوی همزمانی (وقتی یکی دیگه تغییر داده)

1. تغییراتت رو commit کن
2. آخرین تغییرات رو از development بگیر
3. با برنچت merge کن
4. و push کن

```bash
git stash -m "WIP: message"
git fetch origin
git merge origin/development
git stash pop
git add .
git commit -m "message"
git push origin feature/user-panel
```

---

## 📌 خلاصه چرخه کامل

1. از `development` برنچ بزن
2. تغییراتت رو انجام بده → commit/push
3. برنچ `development` رو pr و مرج کن
4. در صورت نیاز تغییرات رو به `master` منتقل کن