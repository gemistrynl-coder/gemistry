import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

// ===============================
// EXPRESS INIT
// ===============================
const app = express();
const PORT = process.env.PORT || 8000;

// ===============================
// CORS CONFIG
// ===============================
const allowedOrigins = [
    "http://localhost:5173",
    "http://192.168.178.50:5173",  // zonder slash!
    "https://www.gemistrytoothgems.nl"
];


app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS: " + origin));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

// ===============================
// DB CONNECTIE (directe Railway string)
// ===============================
const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// ===============================
// ENDPOINTS
// ===============================
app.get("/api/prijslijst", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, naam, description, tldr, prijs, type, image_url, items, aanbetaling FROM prijslijst_categorie ORDER BY prijs, type, id"
        );

        const categories = rows.map(row => {
            let parsedItems = [];
            if (row.items) {
                try {
                    parsedItems = typeof row.items === "string" ? JSON.parse(row.items) : row.items;
                } catch {
                    parsedItems = [];
                }
            }
            return { ...row, items: parsedItems };
        });

        res.json(categories);
    } catch (err) {
        console.error("❌ Database error:", err.message, err.stack);
        res.status(500).json({ error: "Database error" });
    }
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
    console.log(`✅ Backend running on port ${PORT}`);
});
