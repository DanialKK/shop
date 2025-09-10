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
| `backup`      | بکاپ همگام با master 💾            |

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

### ذخیره‌سازی و کامیت

اگر تغییرات داری و می‌خوای پوش کنی، قبلش حتما آخرین تغییرات رو از development بگیر:

```bash
git add .
git commit -m "message"
```

تغییرات کامیت شدن، وقتشه از development بگیری:

```bash
git fetch origin
git rebase origin/development
```

---

## 5️⃣ چک کردن کانفلیکت 

```bash
git status      # چک کردن کانفلیکت
# اگر کانفلیکت وجود داشت ادامه دستورات زیر رو طبق استاندارد وارد کنید، در غیر اینصورت برید به مرحله 6
git add .
git rebase --continue
```

---

## 6️⃣ پوش کردن به برنچ جدید

```bash
git push origin feature/user-panel
```

---

## 7️⃣ به‌روز کردن برنچ‌ها بعد از پوش 

### اول) آپدیت `development`

```bash
git checkout development
git pull origin development
git merge feature/user-panel
git push origin development
```

### دوم) آپدیت `master` (بعد از تست روی development)

```bash
git checkout master
git pull origin master
git merge development
git push origin master
```

### سوم) آپدیت `backup`

```bash
git checkout backup
git pull origin backup
git merge master
git push origin backup
```

---

## 8️⃣ سناریوی همزمانی (وقتی یکی دیگه تغییر داده)

1. تغییراتت رو commit کن
2. آخرین تغییرات رو از development بگیر
3. برگرد به برنچ خودت → push کن

```bash
git add .
git commit -m "message"
git fetch origin
git rebase origin/development
git push origin feature/user-panel
```

---

## 📌 خلاصه چرخه کامل

1. از `development` برنچ بزن
2. تغییراتت رو انجام بده → commit/push
3. برنچ `development` رو مرج کن
4. در صورت نیاز تغییرات رو به `master` → بعد به `backup` منتقل کن