import mongoose from 'mongoose'

export interface TunedModel {
    model_id: string
}

const TunedModelSchema = new mongoose.Schema<TunedModel>({
    model_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

const TunedModel = mongoose.models.TunedModel || mongoose.model('TunedModel', TunedModelSchema)

