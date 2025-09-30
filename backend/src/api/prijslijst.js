// src/api/index.js
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import { google } from "googleapis";
import fs from "fs";

// ===============================
// CONFIG
// ===============================
const app = express();
const PORT = process.env.PORT || 3001; // Railway geeft zelf een $PORT mee

app.use(cors({
    origin: ["https://www.gemistrytoothgems.nl"],
    methods: ["GET", "POST"],
    credentials: true
}));

// ===============================
// DB CONNECTIE (Railway env vars)
// ===============================
const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// check connectie direct bij start
(async () => {
    const [rows] = await pool.query("SELECT NOW() as tijd");
    console.log("✅ Verbonden met DB, tijd:", rows[0].tijd);
})();

// ===============================
// GOOGLE DRIVE SETUP
// ===============================


const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
};

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });


// ID van jouw `blogpost` map (rechtsklik → "Link ophalen")
const BLOGPOST_FOLDER_ID = "1Vo8uUqYxxSoUPrZrNKG77rcdOc67IVhd";

// Helpers
async function readFileContent(fileId) {
    const res = await drive.files.get(
        { fileId, alt: "media" },
        { responseType: "text" }
    );
    return res.data;
}

async function listFilesInFolder(folderId) {
    const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields: "files(id, name, mimeType)"
    });
    return res.data.files;
}

// ===============================
// ENDPOINTS
// ===============================

// ✅ Alle categorieën
app.get("/api/prijslijst", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, naam, description, tldr, prijs, type, image_url FROM prijslijst_categorie ORDER BY type, id"
        );
        res.json(rows);
    } catch (err) {
        console.error("❌ Database error:", err.message, err.stack);
        res.json([]);
    }
});

// ✅ Per categorie type
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

// ✅ Alle items
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

// ✅ Items per categorie
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

// ✅ Blogposts ophalen vanuit Google Drive
app.get("/api/blogposts", async (req, res) => {
    try {
        const blogFolders = await listFilesInFolder(BLOGPOST_FOLDER_ID);

        const posts = [];
        for (const folder of blogFolders) {
            if (folder.mimeType !== "application/vnd.google-apps.folder") continue;

            const files = await listFilesInFolder(folder.id);

            const jsonFile = files.find(f => f.name.endsWith(".json"));
            const imgFile = files.find(f => f.mimeType && f.mimeType.startsWith("image/"));

            if (!jsonFile) continue;

            const jsonContent = await readFileContent(jsonFile.id);
            const jsonData = JSON.parse(jsonContent);

            posts.push({
                ...jsonData,
                imageUrl: imgFile ? `https://drive.google.com/uc?id=${imgFile.id}` : null
            });
        }

        res.json(posts);
    } catch (err) {
        console.error("❌ Fout bij ophalen blogposts:", err);
        res.status(500).json({ error: "Kon blogposts niet ophalen" });
    }
});

// ===============================
// START
// ===============================
app.listen(PORT, () => {
    console.log(`✅ API running on port ${PORT}`);
});
