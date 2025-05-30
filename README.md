# FAQ-PORTAL
A modern FAQ portal where admins manage and analyze FAQs, and users can search, browse, and bookmark answers. Features role-based dashboards, analytics, tag cloud, and a beautiful, responsive UI built with React, Node.js, Express, and MongoDB.


##  Project Structure

```
faq-portal/
├── client/           # Frontend (React)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       └── App.js
│   └── package.json
├── server/           # Backend (Node.js/Express)
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── .env.example
├── .gitignore
├── README.md
```

---

##  Features

- Role-based Dashboards: Separate views for Admins and Users
- FAQ Management: Add, edit, delete, categorize FAQs (Admin)
- Search & Tag Cloud: Fast search, tag-based filtering
- Bookmarking: Users can bookmark FAQs
- Analytics Dashboard: Top categories, tags, usage stats (Admin)
- Responsive UI: Works on all devices
- Modern Design: Glassmorphism, gradients, and animations

---

##  Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT

---

##  Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Arpit8789/faq-portal.git
cd faq-portal
```

### 2. Setup Backend

```bash
cd server
cp .env.example .env    # Fill in your MongoDB URI and JWT secret
npm install
npm run server
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm start
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

---

##  Demo Credentials

Admin:  
username: pradeep_admin
password: Admin@123
 


User:  
username: amit_user
password: User@123


##  Environment Variables

Create a `.env` file in `/server`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Never commit your `.env` file!  
`.env` is already included in `.gitignore`.

---

##  Screenshots
![image](https://github.com/user-attachments/assets/89a77f6e-d88e-4f9a-9801-c7c6c6081145) --Homepage
![image](https://github.com/user-attachments/assets/79b608c5-37a1-4e3c-b615-c95da657aea8) --Loginpage
![image](https://github.com/user-attachments/assets/bc159a83-0d86-431d-8ad1-c23d0e2e20d1) --User dashboard
![image](https://github.com/user-attachments/assets/f0fee613-33f9-4dc1-aa08-0ceb5df726e7) --Admin Dashboard
![image](https://github.com/user-attachments/assets/057b3991-6e43-498f-bf22-26dd71ef3384) --Admin Analytics
![image](https://github.com/user-attachments/assets/0d7d3fa4-4068-42fb-a48d-992de520f3be) --Registerpage





---

##  Usage

- Admins: Login to add/edit/delete FAQs, view analytics, manage categories and tags.
- Users: Login to search FAQs, filter by tags, bookmark answers.
- Bookmark: Click the bookmark icon on any FAQ to save it.
- Analytics: Admins can view top categories, tags, and recent activity.

---

## Troubleshooting

- If you see connection errors, check your `.env` and MongoDB URI.
- If you get a 500 error, check your backend logs for details.
- For styling issues, ensure Tailwind CSS is installed and configured in `/client`.

---

##  Contributing

Pull requests are welcome! Please open an issue first for major changes.



