
# FSD_TASK

A full-stack task management application built using **Next.js** for both the frontend and backend (using Next.js Server Actions). This project allows users to register, log in, and manage their tasks with priority and due date tracking.

---

## 📁 Project Structure

```
FSD_TASK/
├── app/            # Contains all frontend & backend logic
├── .env            # Environment variables (not committed)
├── package.json
└── README.md
```

---

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router)
- **Backend**: Next.js Server Actions
- **Database**: MongoDB

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AyushSharma72/FSD_TASK.git
cd FSD_TASK
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
Mongo_Db_Url=mongodb+srv://asharma7588:Ayush1234@cluster0.8ysl0ky.mongodb.net/TaskManagement
SeceretKey=JJDHRYUUIWBDNKWIDH
```

> ⚠️ Note: Be sure to secure sensitive data in production environments.

### 4. Run the Development Server

```bash
npm run dev
```

This will start both the frontend and backend via Next.js.

---

## 🔐 Demo Credentials

Use the following credentials to log in as an admin:

- **Email**: `admin@gmail.com`
- **Password**: `admin@1234`

---

## 🗃️ MongoDB Schemas

### 📌 Task Schema

```js
const tasksschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "incomplete"],
    default: "incomplete",
  },
  priority: {
    type: String,
    default: "medium",
  },
}, { timestamps: true });

const tasksmodal = mongoose.models.tasks || mongoose.model("tasks", tasksschema);
export default tasksmodal;
```

### 👤 User Schema

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
```

---

