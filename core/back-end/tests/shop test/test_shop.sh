#!/bin/bash

# ============================
# توکن سوپر ادمین
ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MzY4MzI4LCJpYXQiOjE3NTUzNjQ3MjgsImp0aSI6ImIzZTlmZTQwNGU4YjRlZjM4OGY1MTI0M2IzYjBmODFlIiwidXNlcl9pZCI6IjEifQ.K-_4OIjYCxuRQ8Gjl-LKEKhHgxpCn_59y3dfT_TxaHs"
API_URL="http://127.0.0.1:8000/api"

# ============================
# 1. ساخت دسته‌بندی
echo "==> ساخت دسته‌بندی"
curl -s -X POST "$API_URL/categories/" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $ACCESS_TOKEN" \
-d '{
  "name": "Electronics",
  "slug": "electronic"
}'
echo -e "\n"

# ============================
# 2. ساخت تگ
echo "==> ساخت تگ"
curl -s -X POST "$API_URL/tags/" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $ACCESS_TOKEN" \
-d '{"name": "New"}'
echo -e "\n"

# ============================
# 3. ساخت محصول
# توجه: category و tags باید آیدی موجود باشند
echo "==> ساخت محصول"
curl -X POST "http://127.0.0.1:8000/api/products/" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $ACCESS_TOKEN" \
-d '{
    "name": "Book ABC",
    "slug": "book-abc",
    "description": "A great book",
    "price": "19.99",
    "stock": 100,
    "category": 1,
    "tags": [1]
}'


# ============================
# 4. گرفتن لیست دسته‌بندی‌ها
echo "==> لیست دسته‌بندی‌ها"
curl -s -X GET "$API_URL/categories/" \
-H "Authorization: Bearer $ACCESS_TOKEN"
echo -e "\n"

# ============================
# 5. گرفتن لیست تگ‌ها
echo "==> لیست تگ‌ها"
curl -s -X GET "$API_URL/tags/" \
-H "Authorization: Bearer $ACCESS_TOKEN"
echo -e "\n"

# ============================
# 6. گرفتن لیست محصولات
echo "==> لیست محصولات"
curl -s -X GET "$API_URL/products/" \
-H "Authorization: Bearer $ACCESS_TOKEN"
echo -e "\n"
