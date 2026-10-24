import {SubscriberRepo} from "../repo/subscriber.repo.js"
import type { Context } from "hono"

export class SubscriberController{
    static async subscriber(c:Context){
try {
    const {topic,subscriber} = await c.req.json();
    
} catch (error) {
    
}
    }

}