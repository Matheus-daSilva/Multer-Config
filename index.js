import express, { json } from "express";
import multer from 'multer';
import path from "path";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {

        const { name, ext } = path.parse(file.originalname);
        cb(null, `${name}-${Date.now()}.${ext}}`)
    }
})

//const upload = multer({ dest: "./uploads"})
const upload = multer({ storage })

app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file)
    res.send("upload feito com sucesso")
})

app.listen(5000);