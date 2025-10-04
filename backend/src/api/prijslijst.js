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
    "http://localhost:5173",             // voor lokaal testen
    "https://www.gemistrytoothgems.nl"   // productie frontend
];

app.use(
    cors({
        origin: function (origin, callback) {
            // sta ook requests zonder origin toe (zoals curl/postman)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

// ===============================
// DB CONNECTIE (Railway via ENV)
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
// HELPERS
// ===============================
function parseItems(row) {
    if (!row.items) return [];
    try {
        return JSON.parse(row.items);
    } catch {
        return [];
    }
}

// ===============================
// ENDPOINTS
// ===============================
app.get("/api/prijslijst", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, naam, description, tldr, prijs, type, image_url, items FROM prijslijst_categorie ORDER BY type, id"
        );

        const categories = [];

        for (const row of rows) {
            const items = parseItems(row);
            if (items.length > 0) {
                const typesSeen = {};
                for (const item of items) {
                    const t = item.type;
                    if (!typesSeen[t]) {
                        const newCat = {
                            ...row,
                            id: `${row.id}-${t}`, // uniek id
                            naam: `${row.naam} (${t})`,
                            type: t,
                            items: [],
                        };
                        typesSeen[t] = newCat;
                        categories.push(newCat);
                    }
                    typesSeen[t].items.push(item);
                }
            } else {
                categories.push({ ...row, items: [] });
            }
        }

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
