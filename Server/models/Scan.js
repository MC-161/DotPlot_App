import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
  _id: { type: Number, required: true,},
  coordinates: { type: String, required: true },
  date: { type: Date, required: true },
  diagnosis: { type: String, required: true },
  imagePath: { type: String }  // Path to the image file
});

const Scan = mongoose.model('Scan', scanSchema);

export default Scan;
