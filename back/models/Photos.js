import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    id: { type: Number, require: true },
    image: { type: String, required: true },
    description: { type: String, required: false }
})

const Photos = mongoose.model('Photos', Schema);
export default Photos;