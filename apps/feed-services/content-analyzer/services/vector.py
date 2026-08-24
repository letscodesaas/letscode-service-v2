from sentence_transformers import SentenceTransformer

class Vector:
    def __init__(self):
        self.model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
        
        
    def encode(self,post:str):
        embedding = self.model.encode(post)
        return embedding

