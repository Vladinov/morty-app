const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API de Rick y Morty en Node.js');
});

// Ruta para buscar un personaje por nombre
app.get('/character/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get("https://rickandmortyapi.com/api/character/?name=${name}");
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Personaje no encontrado' });
        } else {
            res.status(500).json({ error: 'Error al obtener los datos' });
        }
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})