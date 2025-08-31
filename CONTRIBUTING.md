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

| برنچ | توضیح |
|------|-------|
| `master` | نسخه پایدار (Release) ✅ |
| `development` | توسعه فعال (آخرین تغییرات اصلی) 🛠 |
| `backup` | بکاپ همگام با master 💾 |

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
git checkout -b feature/admin-panel
```

---

## 4️⃣ کار روی برنچ

### ذخیره‌سازی موقت (stash)

اگر تغییرات داری و می‌خوای برنچ عوض کنی:

```bash
git stash push -m "WIP: تغییرات در حال توسعه"
git checkout development
git pull origin development
```

وقتی برگشتی:

```bash
git checkout feature/admin-panel
git merge development
git stash pop
```

---

## 5️⃣ کامیت و پوش تغییرات

```bash
git add .
git commit -m "feat: اضافه‌کردن پنل مدیریت جدید"
git push origin feature/admin-panel
```

---

## 6️⃣ Pull Request (PR)

- از برنچ فیچر به `development` PR بزنید
- ریویو بشه → مرج بشه 🔄

---

## 7️⃣ به‌روز کردن برنچ‌ها بعد از مرج

### اول) آپدیت `development`

```bash
git checkout development
git pull origin development
```

### دوم) آپدیت `master` (بعد از تست روی development)

```bash
git checkout master
git merge origin/development
git push origin master
```

### سوم) آپدیت `backup`

```bash
git checkout backup
git merge origin/master
git push origin backup
```

---

## 8️⃣ سناریوی همزمانی (وقتی یکی دیگه تغییر داده)

1. تغییراتت رو stash کن
2. روی `development` pull کن
3. برگرد به برنچ خودت → merge کن

```bash
git stash
git checkout development
git pull origin development
git checkout feature/admin-panel
git merge origin/development
git stash pop
```

---

## 📌 خلاصه چرخه کامل

1. از `development` برنچ بزن
2. تغییراتت رو انجام بده → commit/push
3. PR بزن به `development`
4. بعد از مرج → `development` رو pull کن
5. در صورت نیاز تغییرات رو به `master` → بعد به `backup` منتقل کن