---

layout: post
title: "Day 1 — Diving Deep into Numerical Python using NumPy"
date: 2025-07-23
keywords: numpy, python, data science, machine learning, omkar pathak python, omkar pathak data science
image: /public/img/blog-images/banner.png
author: Omkar Pathak
tags: [Data Science, NumPy, Python, 60DayDSChallenge]
---

When restarting my data science journey, I knew exactly where I needed to begin: **NumPy** — the powerful foundation for all numerical computing in Python. Whether you’re building ML models, crunching data, or diving deep into neural networks, NumPy is where everything begins.

In this post, I’ll cover the **key theory**, **code implementations**, and **why NumPy is essential** for any data scientist or ML practitioner.

---

## What is NumPy?

NumPy (short for **Numerical Python**) is the core library for scientific computing in Python. It offers:

* A powerful **n-dimensional array** object (`ndarray`)
* Tools for performing fast **vectorized operations**
* Utilities for **linear algebra**, **random number generation**, and **Fourier transforms**

Think of it as the **engine that powers most of your data pipelines**, especially when performance matters.

---

## Core Concepts

Here are the key building blocks you must know:

| Concept       | Explanation                                                |
| ------------- | ---------------------------------------------------------- |
| `ndarray`     | The core data structure – multi-dimensional array          |
| Vectorization | Replacing loops with fast array-wide operations            |
| Broadcasting  | Auto-expanding arrays of different shapes to work together |
| Axis          | Direction across which operations are applied              |
| Shape & Size  | Tuple of dimensions, and total number of elements          |

---

## Array Basics in Python

```python
import numpy as np

# Basic arrays
# note: `ndarray` is the class and np.array() is the function that calls ndarray object
a = np.array([1, 2, 3])
b = np.zeros((2, 3))
c = np.ones((3, 3))
d = np.eye(4)  # Identity matrix
e = np.random.randint(0, 10, (3, 3))
```

### Array Properties

```python
print(e.shape)     # e.g., (3, 3)
print(e.ndim)      # 2 (2D)
print(e.dtype)     # e.g., int64
print(e.size)      # 9
```

---

## NumPy Operations You Should Know

### Arithmetic Operations

```python
x = np.array([[1, 2], [3, 4]])
y = np.array([[5, 6], [7, 8]])

print(x + y)
print(x * y)
print(np.dot(x, y))
```

### Reshaping and Flattening

```python
z = np.arange(12).reshape(3, 4)
print(z.flatten())
```

### Broadcasting Example

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr + np.array([10, 20, 30]))
```

This automatically adds the vector `[10, 20, 30]` to each row of the matrix.

---

## Mini Challenge (Optional Exercise)

Load and process a CSV without using Pandas:

```python
data = np.genfromtxt('iris.csv', delimiter=',', skip_header=1)
features = data[:, :-1]

# Normalize
normalized = (features - features.mean(axis=0)) / features.std(axis=0)
```

This gives you a taste of how much you can achieve with just NumPy.

---

## Key Takeaways

1. **NumPy is fast, lightweight, and vectorized** – it makes for clean and efficient code.
2. Mastering NumPy sets you up for deeper libraries like Pandas, Scikit-Learn, PyTorch, and TensorFlow.
3. Concepts like **broadcasting, reshaping, slicing** are not just academic — they’re practical and powerful tools.
4. Even without Pandas or Scikit-learn, you can load, clean, and process data using pure NumPy.
5. It's worth revisiting even if you've used it before — the depth is surprising.

---

## What’s Next?

Tomorrow, I’ll explore the **Pandas library** — the powerhouse for handling structured data in Python.
