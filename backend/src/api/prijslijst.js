// assets/api/prijslijst.js
import express from "express";
import mysql from "mysql2/promise";

const router = express.Router();

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

// ✅ Alle categorieën + opgesplitst op type (basic/medium/etc.)
router.get("/prijslijst", async (req, res) => {
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

// ✅ Specifiek type ophalen
router.get("/prijslijst/:type", async (req, res) => {
    try {
        const type = req.params.type;
        const [rows] = await pool.query(
            "SELECT id, naam, description, tldr, prijs, type, image_url, items FROM prijslijst_categorie ORDER BY id"
        );

        const categories = [];
        for (const row of rows) {
            const items = parseItems(row).filter((i) => i.type === type);
            if (items.length > 0) {
                categories.push({
                    ...row,
                    naam: `${row.naam} (${type})`,
                    type,
                    items,
                });
            }
        }

        res.json(categories);
    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
