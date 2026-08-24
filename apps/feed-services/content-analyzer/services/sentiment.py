from transformers import pipeline

class Sentiment:
    def __init__(self):
            self.classifier = pipeline(
                "sentiment-analysis",
                 model="distilbert-base-uncased-finetuned-sst-2-english"
            ) 
    def analyze(self,post:str):
        result  = self.classifier(post)
        return result
