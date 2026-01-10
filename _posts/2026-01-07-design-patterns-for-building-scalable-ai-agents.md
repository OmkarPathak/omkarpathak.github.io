---
layout: post
title: Design Patterns for Building Scalable AI Agents
date: 2026-01-07
keywords: python, design patterns, ai agents, llm, singleton, factory, observer, system design
image: /public/img/blog-images/ai-design-patterns.png
author: Omkar Pathak
tags: [System Design, Python, AI, LLM]
---


When building `Agentic` applications—systems where AI models interact with code to perform tasks—standard spaghetti code quickly becomes unmanageable. The indeterministic nature of LLMs combined with rigid software engineering requirements demands robust architectural patterns.

Here are four structural design patterns I use to build scalable, maintainable AI Agent systems.

---

## 1. The Singleton Pattern: Managing Heavy Models

**The Problem:**
Loading an LLM (like Llama-3 or Phi-3) or a Vector Database into memory is expensive. It takes time and eats up RAM. You cannot afford to reload the 5GB model every time a user sends a chat message.

**The Solution:**
The **Singleton Pattern** ensures a class has only one instance and provides a global point of access to it. We use this for our `VectorStore` and `AIModelService`.

### Python Implementation

```python
import time

class MicroVectorStore:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            print("Initializing Heavy Vector Store... (This happens only once)")
            cls._instance = super(MicroVectorStore, cls).__new__(cls)
            cls._instance.database = {}
            # Simulate heavy loading
            time.sleep(1) 
        return cls._instance

    def add_document(self, doc_id, text):
        self.database[doc_id] = text

# Usage
v1 = MicroVectorStore()
v2 = MicroVectorStore()

print(f"Are v1 and v2 the same object? {v1 is v2}")
v1.add_document(1, "Hello AI")
print(f"v2 Data: {v2.database}")
```

**Expected Output:**
```
Initializing Heavy Vector Store... (This happens only once)
Are v1 and v2 the same object? True
v2 Data: {1: 'Hello AI'}
```
*Notice that the second initialization didn't print the loading message.*

---

## 2. The Factory Pattern: Writing Specialized Agents

**The Problem:**
You have different types of tasks: Extracting JSON from a Resume, Summarizing a long PDF, or Chatting. Hardcoding `if task == 'extract': do_this()` leads to massive `utils.py` files.

**The Solution:**
The **Factory Pattern** creates objects without specifying the exact class of object that will be created. We use an `AgentFactory` to spawn specialized agents (ExtractionAgent, SummaryAgent) based on the task intent.

### Python Implementation

```python
from abc import ABC, abstractmethod

# 1. Integration Interface
class BaseAgent(ABC):
    @abstractmethod
    def run(self, input_text):
        pass

# 2. Concrete Agents
class ExtractionAgent(BaseAgent):
    def run(self, input_text):
        return {"action": "Extracting Entities", "data": input_text[:10]}

class SummaryAgent(BaseAgent):
    def run(self, input_text):
        return f"Summary of: {input_text[:10]}..."

# 3. The Factory
class AgentFactory:
    @staticmethod
    def get_agent(task_type):
        if task_type == "extract":
            return ExtractionAgent()
        elif task_type == "summary":
            return SummaryAgent()
        else:
            raise ValueError("Unknown Agent Type")

# Usage
tasks = ["extract", "summary"]
for task in tasks:
    agent = AgentFactory.get_agent(task)
    print(f"Task: {task} -> Output: {agent.run('Omkar Pathak Resume')}")
```

**Expected Output:**
```
Task: extract -> Output: {'action': 'Extracting Entities', 'data': 'Omkar Path'}
Task: summary -> Output: Summary of: Omkar Path...
```

---

## 3. The Observer Pattern: Event-Driven Architecture

**The Problem:**
In an Agentic system, actions often have side effects. When a user deletes a Resume, we need to:
1.  Remove the file from disk.
2.  Remove the record from SQL Database.
3.  **Remove the vector from the Vector DB (RAG).**

Coupling this logic strictly (calling `vector_db.delete()` inside `resume.delete()`) makes the code brittle.

**The Solution:**
The **Observer Pattern** (or Pub/Sub) allows objects to subscribe to events. In Django, we use `Signals`. When a `post_delete` signal fires, the `VectorStore` (the Observer) reacts automatically.

### Python Implementation

```python
class EventManager:
    def __init__(self):
        self._subscribers = []

    def subscribe(self, func):
        self._subscribers.append(func)

    def notify(self, data):
        for func in self._subscribers:
            func(data)

# The System (Subject)
resume_events = EventManager()

# The Observer (Listener)
def reindex_vector_db(doc_id):
    print(f"Observer Alert: Removing Document {doc_id} from Vector Index.")

# Setup
resume_events.subscribe(reindex_vector_db)

# Business Logic
def delete_resume(doc_id):
    print(f"Deleting Resume {doc_id} from Primary DB...")
    # Trigger Event
    resume_events.notify(doc_id)

# Usage
delete_resume(101)
```

**Expected Output:**
```
Deleting Resume 101 from Primary DB...
Observer Alert: Removing Document 101 from Vector Index.
```

---

## 4. The Orchestrator (Mediator) Pattern

**The Problem:**
Agents are stupid in isolation. An Extraction Agent doesn't know about Summary. A centralized brain is needed to coordinate complex workflows.

**The Solution:**
The **Orchestrator Pattern** decouples agents. The Orchestrator manages the state and decides which agent to call next.

```python
class Orchestrator:
    def __init__(self):
        self.extractor = ExtractionAgent()
        self.summarizer = SummaryAgent()
    
    def process_new_file(self, text):
        print("Orchestrator: Starting Workflow...")
        
        # Step 1: Extract
        data = self.extractor.run(text)
        print(f"Step 1 Complete: {data}")
        
        # Step 2: Summarize (using data from Step 1)
        summary = self.summarizer.run(text)
        print(f"Step 2 Complete: {summary}")
        
        return {"structured": data, "summary": summary}

# Usage
system = Orchestrator()
result = system.process_new_file("Senior Python Developer...")
```

---

### Conclusion

Building Agentic AI is 20% Prompt Engineering and 80% Software Engineering. By treating massive LLMs as just another software component managed by strict Design Patterns, we build systems that are reliable, testable, and scalable.
