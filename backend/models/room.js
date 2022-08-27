const mongoose = require("mongoose")

const Schema = mongoose.Schema

const RoomSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        grade: { type: String, required: true },
        subject: { type: String, required: true },
        messages: [{ type: String }]
    }
)

RoomSchema.virtual("url").get(() => { return `rooms/${this._id}` })

module.exports = mongoose.model("Room", RoomSchema)
