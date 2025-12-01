# Звіт з лабораторної роботи №8-9
## Full-stack інтеграція: розробка UI на базі професійного бойлерплейту

---

### 1. Опис реалізованого функціоналу [cite: 57]

У рамках лабораторної роботи було розроблено клієнтську частину (Frontend) для системи управління готелями та клієнтами. Додаток реалізовано як SPA (Single Page Application) з використанням сучасного стеку технологій.

**Основні можливості:**
* **Автентифікація:** Реалізовано вхід у систему (Login) з отриманням JWT-токена.
* **Захист маршрутів (Protected Routes):** Доступ до адмін-панелі мають лише користувачі з роллю `ADMINISTRATOR`. Звичайні користувачі бачать сторінку "Access Denied" або перенаправляються на головну.
* **Управління готелями (Hotels CRUD):** Перегляд списку, створення, редагування та видалення готелів. Реалізовано відображення пов'язаних сутностей (кімнати, персонал).
* **Управління клієнтами (Clients CRUD):** Повний цикл управління базою клієнтів з валідацією даних.
* **UI/UX:** Використано "преміальний" монохромний дизайн, адаптивну верстку, індикатори завантаження та обробку помилок.

**Технологічний стек:**
* **Vite + React + TypeScript:** База проєкту.
* **TanStack Query:** Для керування серверним станом (кешування, запити).
* **TanStack Router:** Для файлової маршрутизації та захисту роутів (`beforeLoad`).
* **Zustand:** Для глобального зберігання стану авторизації (токен, роль).
* **React Hook Form + Zod:** Для валідації форм.
* **Axios:** Для HTTP-запитів.
* **Tailwind CSS:** Для стилізації.

---

### 2. Приклади ключового коду 

#### А. Конфігурація Axios (Interceptors)
Налаштовано автоматичне додавання Bearer-токена до кожного запиту та глобальну обробку помилок (автоматичний логаут при 401).

```typescript
// src/lib/axios.ts
import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/v1",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

#### Б. Хуки TanStack Query (на прикладі Clients)
Використано кастомні хуки для інкапсуляції логіки запитів. Реалізовано мапинг даних для сумісності з бекендом.

```typescript
// src/features/clients/api.ts
const mapClientToBackend = (data: Partial<Client>): any => ({
    first_name: data.firstName,
    last_name: data.lastName,
    middle_name: data.middleName || "",
    email: data.email,
    phone: data.phone,
    is_registered: data.isRegistered ?? true,
});

export const useCreateClient = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createClient, // функція, що викликает axios.post
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            navigate({ to: "/clients" });
        },
    });
};
```

#### B. Схема валідації Zod
Використано сувору типізацію та валідацію полів (наприклад, обов'язкове поле phone та формат email).

```typescript
// src/features/clients/pages/ClientCreatePage.tsx
const clientSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().min(1, "Middle name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
});

type ClientFormData = z.infer<typeof clientSchema>;
```

#### Скріншоти для звіту:

1. Сторінка зі списком сутностей (Clients)
![](/public/1.png)
2. Форма з помилками валідації
![](/public/2.png)
3. Вкладка Network (HTTP-запити)
![](/public/3.png)
![](/public/4.png)
![](/public/4.png)
![](/public/5.png)
4. Сторінка логіну
![](/public/6.png)

#### Особливості реалізації та проблеми
Під час виконання роботи я зіткнулася з ось таким:
1. Невідповідність форматів даних (Mapping): Бекенд очікує дані у форматі snake_case (наприклад, first_name), тоді як на фронтенді прийнято використовувати camelCase (firstName). Рішення: Було створено проміжну функцію-мапер mapClientToBackend в шарі API, яка конвертує дані перед відправкою.
2. Обов'язкові поля в БД: При створенні клієнта виникала помилка 500, оскільки в базі даних поле middle_name було NOT NULL, а у формі його спочатку не було. Рішення: Додано поле "Middle Name" у форму та оновлено схему Zod.
3. Авторизація та Ролі: Потрібно було реалізувати різну логіку для Адміністратора та звичайного Користувача. Рішення: Використано бібліотеку jwt-decode для розшифровки токена на фронтенді. На основі ролі (ADMINISTRATOR) налаштовано Guard у src/routes/hotels.tsx, який показує компонент AccessDenied для користувачів без прав доступу.
4. Debugging у Docker: Для перевірки даних, що приходять на сервер, було налаштовано віддалене налагодження (Remote Debugging) між WebStorm та Docker-контейнером через порт 9229.



