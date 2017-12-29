---
layout: post
title: Python Download Articles using Newspaper API
comments: true
---

Many a times developers need to download the articles on the internet for various purposes. While interning, I was working on a project that needed some news articles to be fetched and analyzed. News articles are a great source of information but the problem lies in its format. News articles are not in a standard format as authors for different news articles are not the same. This is where **Newspaper API** helps us.

[Newspaper API](http://newspaper.readthedocs.io/en/latest/) is a great tool to quickly download articles from the internet and extract the plain text from them. The best thing about Newspaper API is its simplicity to use and faster download speeds. Moreover, it also provides some advanced options which we will see in a moment. Currently it supports 10+ languages and everything is in unicode!

Newspaper API is developed and maintained by ***Lucas Ou-Yang***. You can view the source code for the API [here](https://github.com/codelucas/newspaper).

## Installation

Newspaper API is a Python based and it can be installed on `Python3.x` as well as `Python2.x`.

For installing Newspaper API in Python3 type:

```bash
   $ pip3 install newspaper3k
```

For installing Newspaper API in Python2 type:

```bash
   $ pip install newspaper
```

You might need some dependencies to be installed for extracting images from articles. For that you can find the installation command [here](http://newspaper.readthedocs.io/en/latest/user_guide/install.html#install)

## Features

As I had mentioned earlier, Newspaper API provides some advanced options other than just extracting the news article. Let us dive into some of them.

- Multi-threaded article download framework
- News url identification
- Text extraction from html
- Top image extraction from html
- All image extraction from html
- Keyword extraction from text
- Summary extraction from text
- Author extraction from text
- Google trending terms extraction
- Works in 10+ languages (English, Chinese, German, Arabic, ...)

For extracting the news article

```python
    >>> from newspaper import Article
    >>> url = 'http://fox13now.com/2013/12/30/new-year-new-laws-obamacare-pot-guns-and-drones/'
    >>> article = Article(url)
```

For downloading the article and retrieving its basic details such as title, author, published date

```python
    >>> article.download()
    >>> article.html
    '<!DOCTYPE HTML><html itemscope itemtype="http://...'
    
    >>> article.parse()
    
    >>> article.title
    'New Year, new laws: Obamacare, pot, guns and drones'

    >>> article.authors
    ['Leigh Ann Caldwell', 'John Honway']

    >>> article.publish_date
    datetime.datetime(2013, 12, 30, 0, 0)
```

For extracting images from article

```python
    >>> article.top_image
    'http://someCDN.com/blah/blah/blah/file.png'
```

For extracting all links from the article

```python
    >>> article.movies
    ['http://youtube.com/path/to/link.com', ...]
```

Applying some basic NLP and analyzing the article

```python
    >>> article.nlp()

    >>> article.keywords
    ['New Years', 'resolution', ...]

    >>> article.summary
    'The study shows that 93% of people ...'
```

Isn't that simple! Now go ahead and play with the extracted articles as you want. There are many other similar APIs such as [html2text](https://github.com/aaronsw/html2text), [Lassie](https://github.com/michaelhelmick/lassie), [Python-Goose](https://github.com/grangier/python-goose), [Textract](https://github.com/deanmalmgren/textract). But I would personally recommend using Newspaper API due to the simplicity it offers and some of its advanced features that you cannot get your hands off!

I hope you learned something new from the article, comment below for any doubts. 
<br/>Happy Coding.. :)