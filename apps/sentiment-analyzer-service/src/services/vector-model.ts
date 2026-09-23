import { InferenceClient } from "@huggingface/inference";

export class PostEmbedding extends InferenceClient {
  private modelName: string;

  constructor(t: string, modelName: string) {
    super(t)
    this.modelName = modelName;
  }

  public async model(ip:string) {
    try {
      const output = await this.featureExtraction({
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
