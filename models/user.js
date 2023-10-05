import mongoos from "mongoose"
import findOrCreate from "mongoose-findorcreate"


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
    googleId: String,
    admin: {
        type: String,
        default: false
    }

})

schema.plugin(findOrCreate);
export default new mongoos.model("User", schema)