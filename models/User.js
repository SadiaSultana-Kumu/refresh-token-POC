const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
       
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

mongoose.model("User", User);