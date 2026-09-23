import { Inngest } from "inngest";
import { SentimentAnalyzer } from "../services/sentiment-model.js";
import {PostEmbedding} from "../services/vector-model.js";
import { ENV } from "../env/env.js";


export const inngest = new Inngest({ id: "my-app" });

const sentimentFn = inngest.createFunction(
  {
    id: "sentiment-function",
    triggers: { event: "event/seniment.function" },
  },
  async ({ event, step }) => {
    try {
      const data = event.data;
      const {post,postId,userId} = data;
      const sentimentModel = new SentimentAnalyzer(ENV.TOKEN,ENV.SENTIMENT_MODEL);
      const result = await sentimentModel.model(post);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },
);

const embeddingFn = inngest.createFunction({
  id:"embedding-function",
  triggers:{event:"event/embedding.function"}
},async({event,step})=>{
  try {
    const data =  event.data;
    const {post,postId,userId} = data;
    const embeddingModel = new PostEmbedding(ENV.TOKEN,ENV.EMBEDDING_MODEL);
    const result = await embeddingModel.model(post);
    console.log(result);
  } catch (error) {
      console.log(error)
  }
})


export const functions = [sentimentFn,embeddingFn];