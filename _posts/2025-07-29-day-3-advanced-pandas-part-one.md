---

layout: post
title: Day 3 - Advanced Pandas – Merging, Joining & Window Functions
date: 2025-07-29
keywords: pandas, python, data science, machine learning, omkar pathak python, omkar pathak data science
image: /public/img/blog-images/banner.png
author: Omkar Pathak
tags: [Data Science, NumPy, Python, 60DayDSChallenge]
---

# Day 3: Advanced Pandas – Merging, Joining & Window Functions

## Part 1: Merging and Joining in Pandas

Combining datasets is crucial in real-world data science. Pandas offers SQL-style merging, index-based joining, and simple concatenation.

---

### Setup

```python
import pandas as pd

df = pd.read_csv("https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv")

# Create simplified DataFrames for merging
passenger_info = df[['PassengerId', 'Name', 'Pclass', 'Sex', 'Age']]
fare_info = df[['PassengerId', 'Fare', 'Embarked']]
```

---

### `merge()` – SQL-style join

```python
merged_df = pd.merge(passenger_info, fare_info, on='PassengerId', how='inner')
```

- **inner**: Only rows with matching `PassengerId` in both DataFrames.
- **left**: All rows from `passenger_info`, match from `fare_info`.
- **right**: All rows from `fare_info`, match from `passenger_info`.
- **outer**: All rows from both DataFrames.

```python
# LEFT JOIN example
left_joined = pd.merge(passenger_info, fare_info, on='PassengerId', how='left')
```

```python
# OUTER JOIN example with NaN for missing
outer_joined = pd.merge(passenger_info, fare_info, on='PassengerId', how='outer')
```

---

### Join on different column names

```python
# If IDs are named differently
pd.merge(df1, df2, left_on='id1', right_on='id2')
```

---

### Many-to-One join (Pclass info)

```python
pclass_info = df[['Pclass', 'Fare']].groupby('Pclass').mean().reset_index()
pd.merge(passenger_info, pclass_info, on='Pclass', how='left')
```

---

### `join()` – Index-based join

```python
fare_info_indexed = fare_info.set_index('PassengerId')
joined_df = passenger_info.join(fare_info_indexed, on='PassengerId')
```

---

### `concat()` – Stack vertically or horizontally

```python
# Vertically
df_part1 = df.iloc[:100]
df_part2 = df.iloc[100:200]
combined = pd.concat([df_part1, df_part2], axis=0)

# Horizontally
df1 = df[['PassengerId', 'Sex']]
df2 = df[['PassengerId', 'Fare']]
combined_cols = pd.concat([df1, df2.drop('PassengerId', axis=1)], axis=1)
```

---

## Part 2: Window Functions in Pandas

Window functions apply calculations across subsets of your data (like SQL). Ideal for feature engineering.

---

### Setup: Sort by Pclass and Fare

```python
df_sorted = df.sort_values(['Pclass', 'Fare'], ascending=[True, False])
```

---

### `rank()` – Rank passengers by Fare within Pclass

```python
df_sorted['FareRank'] = df_sorted.groupby('Pclass')['Fare'].rank(method='dense', ascending=False)
```

---

### `cumsum()` – Cumulative Fare sum by Pclass

```python
df_sorted['FareCumSum'] = df_sorted.groupby('Pclass')['Fare'].cumsum()
```

---

### `cumcount()` – Order within groups

```python
df_sorted['CountWithinPclass'] = df_sorted.groupby('Pclass').cumcount() + 1
```

---

### `rolling()` – Moving average of Fare (window=3)

```python
df_sorted['FareRollingMean'] = df_sorted['Fare'].rolling(window=3).mean()
```

```python
# Rolling mean within each class
df_sorted['RollingMeanWithinClass'] = (
    df_sorted.groupby('Pclass')['Fare'].transform(lambda x: x.rolling(3, min_periods=1).mean())
)
```

---

### `expanding()` – Expanding window average

```python
df_sorted['FareExpandingMean'] = (
    df_sorted.groupby('Pclass')['Fare'].transform(lambda x: x.expanding().mean())
)
```

---

### `shift()` – Get previous row’s fare

```python
df_sorted['FarePrev'] = df_sorted.groupby('Pclass')['Fare'].shift(1)
df_sorted['FareChange'] = df_sorted['Fare'] - df_sorted['FarePrev']
```

---

### `diff()` – Fare difference from previous row

```python
df_sorted['FareDiff'] = df_sorted.groupby('Pclass')['Fare'].diff()
```

---

## Summary Table

| Task                     | Function               |
|--------------------------|------------------------|
| SQL joins                | `merge()`              |
| Index-based joins        | `join()`               |
| Stack/append             | `concat()`             |
| Rank within group        | `rank()`               |
| Cumulative stats         | `cumsum()`, `cumcount()`|
| Rolling window           | `rolling()`            |
| Expanding window         | `expanding()`          |
| Previous row reference   | `shift()`              |
| Delta between rows       | `diff()`               |


Code for Day 3 can be found on my github repository: [Day 3 of Data Science](https://github.com/OmkarPathak/data-science-notes/blob/main/Day%203%20-%20Advanced%20Pandas.ipynb)
