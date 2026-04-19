import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbInit from "./data/db-init.js";
import service from "./services/store.service.js"

dotenv.config();

const app = express();
//app.use(express.json())
app.use(cors());

app.get("/status", (req, res) => {
    res.json({ respuesta: "API iniciada y escuchando..." });
});

app.get('/locales', service.get_all_AR);

app.get('/locales/interior', service.get_all_AR_NO_AMBA);

(async function start() {
    //const PORT = process.env.PORT || 3000;

    // Inicializar la conexión a la base de datos
    await dbInit();

    // Iniciar el servidor
    app.listen(3000, () => {
        console.log('LISTO JEFE');
    });
}());
