import mongoose from "mongoose";
const fieldSchema = new mongoose.Schema({
    fields: [{
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        }
    }],
    email:{
        type:String,
        required:true

    }
})
export const Data = mongoose.models.data || mongoose.model('data', fieldSchema)


const submit=new mongoose.Schema({
    formBuilderid:String,
    submittedData:[
        {
            key:String,
            value:String
        }
    ]
})
const formSubmission=mongoose.models.formSubmission || mongoose.model('formSubmission',submit)
export {formSubmission}