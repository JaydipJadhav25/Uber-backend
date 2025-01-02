import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RideSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    caption: {
        type: Schema.Types.ObjectId,
        ref: 'caption',

    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted' , 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
 
    },
    distance: {
        type: Number,
     
    },
    paymentId: {
        type: String,
  
    },
    orderId: {
        type: String,
    
    },
    signature: {
        type: String,
      
    },
    otp :{
        type : String,
        select : false,
        required : true
    }
});

RideSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// module.exports = mongoose.model('Ride', RideSchema);
export const riderModel =  mongoose.model('Ride', RideSchema);