import { InferenceClient } from "@huggingface/inference";
 

export class SentimentAnalyzer extends InferenceClient {
  private modelName: string;

  constructor(t: string, modelName: string) {
    super(t)
    this.modelName = modelName;
  }

  public async model(ip:string) {
    try {
      const output = await this.textClassification({
        model: this.modelName,
        inputs: ip,
        provider: "auto",
      });
      return output;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
