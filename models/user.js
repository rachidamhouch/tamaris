import mongoos from "mongoose"

const schema = new mongoos.Schema({
    name: String,
    age: String,
    phone: String,
    input1: String,
    input2: String,
    input3: String,
    input4: String,
    input5: String,
    img: String,
    input6: String,
    good: {
        type: Boolean,
        default: true
    }
})

export default new mongoos.model("User", schema)