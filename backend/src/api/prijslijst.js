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
const PORT = process.env.PORT || 3001;

// CORS instellen
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

// Check connectie bij start
(async () => {
    const [rows] = await pool.query("SELECT NOW() as tijd");
    console.log("✅ Verbonden met DB, tijd:", rows[0].tijd);
})();

// ===============================
// GOOGLE DRIVE SETUP
// ===============================
const auth = new google.auth.GoogleAuth({
    keyFile: "public/blog-473623-7fd7db1d0012.json", // je service account key
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});
const drive = google.drive({ version: "v3", auth });

// De folder ID van jouw `blogpost` map
// (rechtsklik op de map in Drive → "Link ophalen" → ID kopiëren)
const BLOGPOST_FOLDER_ID = "1Vo8uUqYxxSoUPrZrNKG77rcdOc67IVhd";

// Helper: bestand-inhoud uitlezen
async function readFileContent(fileId) {
    const res = await drive.files.get({
        fileId,
        alt: "media"
    }, { responseType: "text" });
    return res.data;
}

// Helper: lijst bestanden in een map
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

// ✅ Prijslijst
app.get("/api/prijslijst", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, naam, description, tldr, prijs, type, image_url FROM prijslijst_categorie ORDER BY type, id"
        );
        res.json(rows);
    } catch (err) {
        console.error("❌ Database error:", err.message);
        res.json([]);
    }
});

// ✅ Blogposts vanuit Google Drive
app.get("/api/blogposts", async (req, res) => {
    try {
        const blogFolders = await listFilesInFolder(BLOGPOST_FOLDER_ID);

        const posts = [];
        for (const folder of blogFolders) {
            if (folder.mimeType !== "application/vnd.google-apps.folder") continue;

            const files = await listFilesInFolder(folder.id);

            const jsonFile = files.find(f => f.name.endsWith(".json"));
            const imgFile = files.find(f => f.mimeType.startsWith("image/"));

            if (!jsonFile) continue;

            const jsonContent = await readFileContent(jsonFile.id);
            const jsonData = JSON.parse(jsonContent);

            posts.push({
                ...jsonData,
                imageUrl: imgFile
                    ? `https://drive.google.com/uc?id=${imgFile.id}`
                    : null
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
