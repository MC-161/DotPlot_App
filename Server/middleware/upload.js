import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


// Get the current directory of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../data/images/'));
  },
  filename: (req, file, cb) => {
    // Check if scanId is available in request body
    const scanId = req.body.scanId;
    if (!scanId) {
      return cb(new Error('Scan ID is missing'));
    }
    cb(null, `${scanId}${path.extname(file.originalname)}`);
  }
});

// Initialize upload
const upload = multer({ storage });

export default upload;
