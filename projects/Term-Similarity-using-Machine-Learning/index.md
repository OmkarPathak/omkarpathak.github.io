---
layout: page
title: Term Similarity using Machine Learning
permalink: /projects/term-similarity-using-machine-learning/
description: A simple project used to find similar terms using Machine Learning technique like Nearest Neighbour and TF-IDF.
keywords: term similarity, tf-idf, machine learning, automatic tagging, similar terms
---

# Term Similarity using Machine Learning
What is the project all about?

- Using Machine learning methods to find similar terms using their context
- Useful in many situations such as automatic tagging using contexts

## Results

{% highlight bash %}

# Suppose you have to find the similar terms for the word 'machine learning'
# Then run the following command
$python3 find_word_similarity.py 'machine learning'

# Output would be

   distance                     name
0  0.000000         Machine Learning
1  0.000000         machine learning
2  1.213289                 software
3  1.213289                 Software
4  1.216590  Artificial Intelligence
5  1.216590  artificial intelligence
6  1.219796     predictive analytics
7  1.224047         data & analytics
8  1.224047           data analytics
9  1.241769       big data analytics

# As we can see in the above output 'machine learning' is closely related to
# terms or words as 'big data' and 'artificial intelligence'

{% endhighlight %}

**Source Code**: [Github](https://github.com/OmkarPathak/Term-Similarity-using-Machine-Learning)
