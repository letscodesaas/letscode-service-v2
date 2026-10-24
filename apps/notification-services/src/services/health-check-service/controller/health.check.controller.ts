import type {Context} from "hono"

export class HealthCheckController{
    static healthcheck(C:Context){
        try {
            C.status(200)
            return C.json({message:"Healthy"})
        } catch (error) {
            console.log(error)
            C.status(500)
            return C.json({message:'Internal Server Error'})
        }
    }
}