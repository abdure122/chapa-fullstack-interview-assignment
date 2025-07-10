
---

## 🚀 How to Run the Project

### 1️⃣ Backend Setup (Laravel)

```bash
cd Backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

> Make sure the backend runs on:
> 📍 `http://127.0.0.1:8000`

---

### 2️⃣ Frontend Setup (React + Vite)

```bash
cd ../Frontend
npm install
npm run dev
```

> The frontend will run on:
> 📍 `http://localhost:5173`

Make sure the backend is already running **before** starting the frontend.

---

### 👤 Demo Accounts

You can use the following demo users to log in `/login`:

| Role        | Email                                               | Password |
| ----------- | --------------------------------------------------- | -------- |
| User        | user1@chapa.co                                     | password |
| Admin       | admin1@chapa.co                                    | password |
| Super Admin | superadmin1@chapa.co                               | password |

Or register a new user via the `/register` page.

