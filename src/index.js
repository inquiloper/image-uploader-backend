import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const PORT = process.env.PORT || process.env.SERVER_PORT;
const UPLOAD_DIR = "public/uploads/";
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});
const app = express();

app.use(cors());
app.use(express.static(`${path.resolve(__dirname, '..')}/public`));
console.log('__dirname', path.resolve(__dirname, '..'))

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})

app.post('/upload-file', upload.single('file'), (req, res) => {
    console.log(`new upload = ${req.file.filename}\n`);
    console.log(req.file);
    res.json({ imageUrl: `${req.protocol}://${req.get('Host')}/uploads/${req.file.filename}`});
})