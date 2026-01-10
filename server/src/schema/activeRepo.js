import { Schema,model } from "mongoose";

const activeRepoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
    repoId: { type: Number, required: true },
    repoName: { type: String, required: true },
    repoFullName: { type: String, required: true },
    repoOwner: { type: String, required: true },
    defaultBranch: { type: String, required: true },


    
    webhookId: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now },

}, { timestamps: true });

const ActiveRepo = model('ActiveRepo', activeRepoSchema);

export default ActiveRepo;