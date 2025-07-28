---

layout: post
title: "Day 2: Mastering Pandas with Titanic Dataset"
date: 2025-07-28
keywords: pandas, python, data science, machine learning, omkar pathak python, omkar pathak data science
image: /public/img/blog-images/banner.png
author: Omkar Pathak
tags: [Data Science, NumPy, Python, 60DayDSChallenge]
---

*Your Practical Guide to Data Wrangling in Python*

---

## What is Pandas?

**Pandas** is a Python library that allows us to store, manipulate, clean, and analyze tabular data (like Excel or SQL tables). It’s essential for every Data Scientist.

---

## Getting Started

### Install & Import
```bash
pip install pandas
```

```python
import pandas as pd
```


## Pandas Data Structures

### 1. **Series** – One-dimensional data
```python
ages = pd.Series([22, 38, 26])
print(ages)
```

### 2. **DataFrame** – Two-dimensional table
```python
df = pd.DataFrame({'Age': [10,12], 'Name': ['Alice', 'Bob'})
print(df.head())
```

---

## Titanic Dataset

We’ll use the **Titanic dataset** — a classic dataset containing information about passengers aboard the Titanic.
You can download the titanic dataset from [here](https://www.kaggle.com/c/titanic/data)

```python
# to read the titanic dataset
df = pd.read_csv('train.csv'))
```

---

---

## Exploring the Dataset

### Basic Info
```python
df.shape            # Number of rows & columns
df.columns          # Column names
df.info()           # Data types & non-null counts
df.describe()       # Stats for numeric columns
```

---

## Accessing Data

### Select Column(s)
```python
df['Age']                    # Single column
df[['Name', 'Age']]          # Multiple columns
```

### Select Row(s)
```python
df.iloc[0]                   # First row
df.loc[0]                    # First row (label-based)
df.iloc[0:5]                 # First 5 rows
```

---

## Filtering Rows

### Example: Get all passengers older than 60
```python
df[df['Age'] > 60]
```

### Example: Female passengers in 1st class
```python
df[(df['Sex'] == 'female') & (df['Pclass'] == 1)]
```

---

## Handling Missing Data

### Check for missing values
```python
df.isnull().sum()
```

### Drop rows with missing values
```python
df.dropna(inplace=False)
```

### Fill missing age with average age
```python
mean_age = df['Age'].mean()
df['Age'].fillna(mean_age, inplace=True)
```

---

## Renaming Columns

```python
df.rename(columns={'Pclass': 'PassengerClass'}, inplace=True)
```

---

## Creating New Columns

### Example: Create a child/adult category
```python
df['AgeGroup'] = df['Age'].apply(lambda x: 'Child' if x < 18 else 'Adult')
```

---

## Aggregation and Grouping

### Get average age by passenger class
```python
df.groupby('PassengerClass')['Age'].mean()
```

### Count survivors by gender
```python
df.groupby('Sex')['Survived'].sum()
```

---

## Value Counts

### Count passengers in each class
```python
df['PassengerClass'].value_counts()
```

---

## Sorting

### Sort by Age
```python
df.sort_values(by='Age', ascending=True).head()
```

---

## Bucketing Ages with `pd.cut()`

```python
bins = [0, 20, 30, 40, 50, 60, 80]
labels = ['0-20', '21-30', '31-40', '41-50', '51-60', '61+']
df['AgeBin'] = pd.cut(df['Age'], bins=bins, labels=labels)

df['AgeBin'].value_counts().sort_index()
```

---

## Summary

| Task                     | Function / Method                    |
|--------------------------|--------------------------------------|
| Load CSV                 | `pd.read_csv()`                      |
| Inspect data             | `df.info()`, `df.describe()`         |
| Select data              | `df['col']`, `df.iloc[]`, `df.loc[]` |
| Filter rows              | Boolean indexing                     |
| Handle missing data      | `isnull()`, `dropna()`, `fillna()`   |
| Group & summarize        | `groupby()`, `agg()`                 |
| Sort data                | `sort_values()`                      |
| Bucket data              | `pd.cut()`                           |

---

## What's Next?

In **Day 3**, we’ll explore:

- Pivot tables
- Melt/unpivot
- Time series
- Window functions
- Performance tips

---

Code for Day 2 can be found on my github repository: [Day 2 of Data Science]([https://github.com/OmkarPathak/data-science-notes/blob/main/Day%201%20-%20Numpy%20operations.ipynb](https://github.com/OmkarPathak/data-science-notes/blob/main/Day%202%20-%20Exploring%20Data%20using%20Pandas.ipynb))

## Bonus: Resources

- [Titanic Dataset on Kaggle](https://www.kaggle.com/c/titanic/data)
- [Pandas Documentation](https://pandas.pydata.org/docs/)
