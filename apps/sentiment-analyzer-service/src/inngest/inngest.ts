import { Inngest } from "inngest";
import {
  ConnectDB,
  postEmbeddings,
  postSentiments,
} from "@repo/database/database";
import { SentimentAnalyzer } from "../services/sentiment-model.js";
import { PostEmbedding } from "../services/vector-model.js";
import { ENV } from "../env/env.js";

export const inngest = new Inngest({ id: "my-app" });

const database = new ConnectDB();
let databaseConnection: Promise<void> | undefined;

const connectDatabase = () => {
  databaseConnection ??= database.init(ENV.MONGODB_URI);
  return databaseConnection;
};

const sentimentFn = inngest.createFunction(
  {
    id: "sentiment-function",
    triggers: { event: "event/seniment.function" },
  },
  async ({ event, step }) => {
    await connectDatabase();

    const { post, postId, userId } = event.data;
    const sentimentModel = new SentimentAnalyzer(
      ENV.TOKEN,
      ENV.SENTIMENT_MODEL,
    );
    const result = await sentimentModel.model(post);
    const sentiment = result[0];

    await postSentiments.create({
      postId,
      userId,
      post,
      sentiments: sentiment.label,
      score: String(sentiment.score),
    });
  },
);

const embeddingFn = inngest.createFunction(
  {
    id: "embedding-function",
    triggers: { event: "event/embedding.function" },
  },
  async ({ event, step }) => {
    await connectDatabase();

    const { post, postId, userId } = event.data;
    const embeddingModel = new PostEmbedding(
      ENV.TOKEN,
      ENV.EMBEDDING_MODEL,
    );
    const result = await embeddingModel.model(post);
    const embedding = Array.isArray(result[0]) ? result[0] : result;

    await postEmbeddings.create({
      postId,
      userId,
      post,
      embedding,
    });
  },
);

export const functions = [sentimentFn, embeddingFn];