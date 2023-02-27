import { Schema, model } from 'mongoose';

interface IPart {
    partNumber: string,
    description: string,
    stock?: number,
    minimum?: number
}

const partSchema = new Schema<IPart>({
    partNumber: { type: String, required: [true, 'Part # required'], index: true },
    description: { type: String, required: [true, 'Description required'] },
    stock: { type: Number, default: 0 },
    minimum: { type: Number, default: 0 }
}, { timestamps: true });

const Part = model<IPart>('Part', partSchema);

export default Part;