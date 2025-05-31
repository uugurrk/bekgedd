require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB bağlantısı başarılı!"))
    .catch(err => console.error("MongoDB bağlantı hatası:", err));

app.use(cors());
app.use(bodyParser.json());

// Public klasörünü sun
app.use(express.static(path.join(__dirname, 'public')));

// Geriye kalan tüm endpoint'ler zaten tanımlı (senin `server.js` dosyanda mevcut)

// 404 olmayan URL'leri index.html'e yönlendir (SPA desteklemek için, opsiyonel)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
