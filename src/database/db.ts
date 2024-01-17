import mongoose from "mongoose"
import { ATLAS_PASS } from "../loadEnv"

const uri = `mongodb+srv://naveen75way:${ATLAS_PASS}@cluster0.g2gxloe.mongodb.net/?retryWrites=true&w=majority`
export async function connectToDb() {
    try{
        await mongoose.connect(uri)
        console.log("CONNECTD TO DATABASE!")
    }catch(err){
        console.log(`ERROR : ${err}`)
        throw new Error(`CANNOT CONNECT TO DATABASE`)
    }   
}