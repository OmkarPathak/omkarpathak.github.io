---
layout: post
title: Choosing the Right Vector Store - Why I Chose Numpy over FAISS for My Resume Parser
date: 2026-01-10
keywords: python, vector stores, ai agents, llm, singleton, factory, observer, system design
image: /public/img/blog-images/vector-stores-vs-numpy.png
author: Omkar Pathak
tags: [System Design, Python, AI, LLM]
---

# Choosing the Right Vector Store: Why I Chose Numpy over FAISS for My Resume Parser

I stared at my `docker-compose.yml`. It was growing. Again.

Rebuilding my resume parser started as a hobby project in 2018 using local LLMs to create a privacy focused recruitment management system. The goal was simple: take a folder of PDFs, understand them, and let a recruiter ask naturally, *"Who has experience with Python and scalable systems?"*

To achieve this "Semantic Search," the entire internet told me the same thing: *"You need a Vector Database."*

So there I was, ready to add yet another service to my stack. I already had Postgres. I had Redis. I had the backend and frontend services. And now, I was about to provision a specialized database just to store arrays of numbers? My laptop fans spun up, as if groaning under the weight of my over-engineering.

It didn't feel right. Sometimes, the "best" industry-standard tool is actually the wrong tool for your specific problem.

In building my Resume Parser, I made a controversial choice: I skipped **Pinecone**, **Chroma**, and **FAISS** entirely. I built a custom solution using just **Numpy**.

Here is the story of why I chose "Simple" over "Powerful," and the headaches I avoided along the way.

---

## The Trap: "Resume Driven Development"

In the age of Generative AI and RAG (Retrieval-Augmented Generation), Vector Stores have become the new hammer. From **Weaviate** to **Qdrant**, developers are spoiled for choice. 

When you read tutorials, they all say: *"Step 1: Spin up a Vector DB."*

But engineering is about constraints, not just capabilities. For my specific use case, the standard contenders posed significant problems:

### 1. The Cloud Giants (Pinecone)
**The Pitch:** Infinite scale, managed infrastructure, "it just works."
**The Reality for Me:** 
My app is **Local-First**. I want users to download an executable and run it on their sensitive HR data without an internet connection.
*   **Privacy:** Sending candidate resumes to a 3rd-party cloud service is a non-starter for many companies.
*   **Friction:** Asking a user to sign up for an API key and paste it into a config file is the fastest way to kill user onboarding.

### 2. The Docker Heavyweights (Chroma, Weaviate, Qdrant)
**The Pitch:** Powerful, feature-rich, open-source.
**The Reality for Me:**
These are fantastic pieces of engineering. But they are *services*.
To run them locally, you need Docker. You need to orchestrate containers.
*   **Resource Hog (The 500MB Problem):** Is it reasonable to ask a user to spin up a container that idles at 500MB+ RAM, just to store 500 resumes? 
*   **Complexity:** "Why is my database connection refuising?" "Oh, the container hasn't finished health-checking yet." I didn't want to debug networking issues when I should be debugging parsing logic.

### 3. The Library Specialists (FAISS)
**The Pitch:** The gold standard for speed and efficiency. Facebook AI Similarity Search.
**The Reality for Me:**
FAISS is a beast. 
*   **Installation Hell:** Have you ever tried to install `faiss-gpu` on a random Windows laptop without the right CUDA drivers? It’s a rite of passage I wouldn't wish on my enemies.
*   **Overkill:** FAISS uses approximate algorithms (ANN) to search billions of vectors in milliseconds. I don't have billions. I have hundreds.

---

## The Epiphany: Do the Math

Then, I stopped following tutorials and started doing math.

A standard OpenAI or HuggingFace embedding vector usually has **768 dimensions**.
Each dimension is a standard float (4 bytes).
So, one resume = $768 \times 4$ bytes $\approx$ **3 KB**.

If a hiring manager has **1,000 resumes** (a very healthy pipeline), that's:
$1,000 \times 3 \text{ KB} = \mathbf{3 \text{ MB}}$.

**3 Megabytes.**

I was considering deploying a distributed, containerized, complex database system... to manage a dataset smaller than a single high-quality MP3 song.

## The Numpy Solution

Once I realized the data size was trivial, the solution was obvious. I didn't need a database. I needed a list.

I implemented a `VectorStore` class in about 80 lines of Python using **Numpy** and **Scikit-Learn**.

1.  **Storage:** A simple list of dictionaries. `[{'vector': np.array(...), 'meta': {...}}]`.
2.  **Persistence:** I dump this list to disk using `pickle`.
3.  **Search:** I use `cosine_similarity` to compare the query against *everything* at once.

### The Code
It felt almost like cheating.

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import pickle

class SimpleVectorStore:
    def __init__(self):
        self.index = [] # Just a list!

    def add(self, vector, metadata):
        self.index.append({'vector': vector, 'metadata': metadata})

    def search(self, query_vector, k=5):
        if not self.index:
            return []
            
        # 1. Stack all vectors into a matrix (N, 768)
        # This is incredibly fast in Numpy
        db_vectors = np.array([item['vector'] for item in self.index])
        
        # 2. Brute Force: Calculate distance to EVERYTHING
        # "Linear Search" - usually a bad word, but at this scale, it's instant.
        similarities = cosine_similarity([query_vector], db_vectors)[0]
        
        # 3. Sort and slice
        top_indices = np.argsort(similarities)[::-1][:k]
        return [self.index[i] for i in top_indices]
        
    def save(self, path):
        with open(path, 'wb') as f:
            pickle.dump(self.index, f)
```

## Why Simplicity Won

### 1. Mathematical Accuracy (No Approximations)
Tools like FAISS use "Approximate Nearest Neighbors" (ANN). They trade a tiny bit of accuracy for massive speed. They might say, "Here are the top 10 results, and I'm 99% sure I didn't miss the best one."

With my Numpy approach, I am doing a **Brute Force** search. I compare the query against *every single document*.
Result? **100% Accuracy.** I never miss the perfect candidate because of a clustering artifact.

### 2. Zero Deploy Friction
My "database" is just a file: `vectors.pkl`. 
*   No ports to bind.
*   No docker containers to crash.
*   No C++ bindings to compile.
It works on Mac, Windows, Linux, and Raspberry Pi without a single change.

### 3. "Blazing" Fast (Note the quotes)
"But linear search is $O(N)$! It's slow!"
Yes, theoretically. But computers are fast.
On a standard modern CPU, Numpy can calculate the cosine similarity between a query and **10,000 vectors** in roughly **5-10 milliseconds**.
To the user, that is instantaneous.

---

## When SHOULD you use a Vector DB?

I'm not bashing Vector Databases. They are triumphs of engineering. You absolutely *should* use them if:
1.  **Scale:** You have > 1 Million vectors. Linear search starts to lag here (100ms+).
2.  **Updates:** You need high-concurrency reads and writes.
3.  **Filtering:** You need complex SQL-like filtering ("Find engineers in London with > 5 years experience") mixed with semantic search. (Though, you can do this in Python too!)

## Conclusion

As developers, we often feel the pressure to use the "Pro" stack. We worry that if we don't use the latest technology, our systems aren't "Scalable."

But **SCALABLE** doesn't mean "Capable of handling Google-scale traffic." It means "Capable of handling the traffic *you actually have*, with room to grow."

For my Resume Parser, sticking to Numpy kept my architecture clean, my footprint small, and my development speed fast. I avoided the feature bloat and infrastructure headaches, allowing me to focus on what mattered: parsing resumes better.

Sometimes, the smartest code is the code you *don't* write.

---

If you're interested in checking out the code or contributing, the project is open source: [OmkarPathak/ResumeParser](https://github.com/OmkarPathak/ResumeParser)
