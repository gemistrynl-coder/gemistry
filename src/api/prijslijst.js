import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

// DB connectie
const pool = mysql.createPool({
    host: "centerbeam.proxy.rlwy.net",
    port: 21767,
    user: "root",
    password: "XfruCWfQIGIIqazeuNyvwiNcTeTaddPW",
    database: "railway"
});

// ✅ Endpoint: alles ophalen
app.get("/api/prijslijst", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, naam, description, tldr, prijs, type, image_url FROM prijslijst_categorie ORDER BY type, id"
        );
        res.json(rows);
    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// ✅ Endpoint: per categorie/type
app.get("/api/prijslijst/:type", async (req, res) => {
    try {
        const type = req.params.type;
        const [rows] = await pool.query(
            "SELECT id, naam, description, tldr, prijs, type, image_url FROM prijslijst_categorie WHERE type = ? ORDER BY id",
            [type]
        );
        res.json(rows);
    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// ✅ Endpoint: alle items ophalen
app.get("/api/prijslijst-items", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, categorie_id, naam, prijs FROM prijslijst_items ORDER BY categorie_id, id"
        );
        res.json(rows);
    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// ✅ Endpoint: items per categorie ophalen
app.get("/api/prijslijst-items/:categorieId", async (req, res) => {
    try {
        const categorieId = req.params.categorieId;
        const [rows] = await pool.query(
            "SELECT id, categorie_id, naam, prijs FROM prijslijst_items WHERE categorie_id = ? ORDER BY id",
            [categorieId]
        );
        res.json(rows);
    } catch (err) {
        console.error("❌ Database error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ API running at http://localhost:${PORT}`);
});
