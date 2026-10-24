import { Subscriber } from "@repo/database/database";

type Subscriber = {
  email: string;
  topic: string;
};


export class SubscriberRepo {
  public async create(subscriber: Subscriber) {
    try {
      const isSubscriberExists: Subscriber = await Subscriber.findOne({
        // @ts-ignore
        email: subscriber.email,
      });
      if (!isSubscriberExists) {
        const sub = new Subscriber(subscriber);
        await sub.save();
      }
      const isTopicExists: boolean = isSubscriberExists.topic
        .split(",")
        .includes(subscriber.topic);
      if (!isTopicExists) {
        const newTopic = isSubscriberExists.topic.split(",");
        const preTopic = newTopic.join(",").concat(`,${subscriber.topic}`);
        await Subscriber.updateOne(
          {
            email: subscriber.email,
          },
          {
            topic: preTopic,
          },
        );
      }
    } catch (error) {}
  }
  public async find(topic:string){
    try {
        const subscribers:Subscriber[] = await Subscriber.find();
        if(!subscribers){
            return
        }
        
        const sub = subscribers.map((ele:Subscriber)=>{
                return ele.topic.split(",").includes(topic)
        });
        if(!sub){
            return
        }
        return sub
        
    } catch (error) {
        throw new Error(String(error))
    }
  }
  public async findAll(){
    try {
        const subscriber = await Subscriber.find().sort({
            createdAt:-1
        });
        return subscriber;
    } catch (error) {
        throw new Error(String(error))
    }
  }
  
}
