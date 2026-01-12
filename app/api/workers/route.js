import { NextResponse } from "next/server"
import { workerData } from "worker_threads";
import {connectDB} from "../../../lib/db"; 
import Worker from "../../../lib/models/Worker";


export async function GET(req){
    await connectDB();
    const workers = await Worker.find().lean();
    console.log(workers)
    
 return NextResponse.json(
    
    {workers}
 );
}