---
layout: post
title: Writing Your Own Resume Parser
comments: true
description: A step by step guide on how you can write your own resume parser
keywords: omkar pathak, jekyll blog, resume parser, parser, nlp, natural language processing, machine learning, spacy, nltk, parts of speech tagging, pos
image: /public/img/blog-images/python.png
tags: [python, nlp]
---

# Why to write your own Resume Parser

Resumes are a great example of unstructured data. Each resume has its unique style of formatting, has its own data blocks, and has many forms of data formatting. This makes reading resumes hard, programmatically. Recruiters spend ample amount of time going through the resumes and selecting the ones that are a good fit for their jobs. Tech giants like Google and Facebook receive thousands of resumes each day for various job positions and recruiters cannot go through each and every resume. This is why Resume Parsers are a great deal for people like them. Resume Parsers make it easy to select the perfect resume from the bunch of resumes received.

We will be learning how to write our own simple resume parser in this blog. For the extent of this blog post we will be extracting Names, Phone numbers, Email IDs, Education and Skills from resumes.

## Index

- [First Step - Reading the Resume](#first-step)
    - [Installing `pdfminer`](#installing-pdfminer)
    - [Installing `doc2text`](#installing-doc2text)
    - [Extracting text from **PDF**](#extract-text-pdf)
    - [Extracting text from **doc** and **docx**](#extract-text-doc)
- [Second Step: Extracting Names](#second-step)
    - [Installing `spaCy`](#installing-spacy)
    - [Rule Based Matching](#rule-based-matching)
- [Third Step: Extracting Phone Numbers](#third-step)
- [Forth Step: Extracting Emails](#forth-step)
- [Fifth Step: Extracting Skills](#fifth-step)
    - [Installing `pandas`](#installing-pandas)
    - [Word Tokenization and Extraction](#word-token)
- [Sixth Step: Extracting Education](#sixth-step)

<a id="first-step"></a>

# First Step: Reading the Resume

Resumes do not have a fixed file format, and hence they can be in any file format such as `.pdf` or `.doc` or `.docx`. So our main challenge is to read the resume and convert it to plain text. For this we can use two Python modules: [pdfminer](https://github.com/euske/pdfminer) and [doc2text](https://github.com/ankushshah89/python-docx2txt). These modules help extract text from `.pdf` and `.doc`, `.docx` file formats.

<a id="installing-pdfminer"></a>

### Installing `pdfminer`:

```bash
pip install pdfminer        # python 2
pip install pdfminer.six    # python 3
```

<a id="installing-doc2text"></a>

### Installing `doc2text`:

```bash
pip install doc2text
```

<a id="extract-text-pdf"></a>

### Extracting text from **PDF**:

```python
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as fh:
        # iterate over all pages of PDF document
        for page in PDFPage.get_pages(fh, caching=True, check_extractable=True):
            # creating a resoure manager
            resource_manager = PDFResourceManager()
            
            # create a file handle
            fake_file_handle = io.StringIO()
            
            # creating a text converter object
            converter = TextConverter(
                                resource_manager, 
                                fake_file_handle, 
                                codec='utf-8', 
                                laparams=LAParams()
                        )

            # creating a page interpreter
            page_interpreter = PDFPageInterpreter(
                                resource_manager, 
                                converter
                            )

            # process current page
            page_interpreter.process_page(page)
            
            # extract text
            text = fake_file_handle.getvalue()
            yield text

            # close open handles
            converter.close()
            fake_file_handle.close()

# calling above function and extracting text
for page in extract_text_from_pdf(file_path):
    text += ' ' + page
```

<a id="extract-text-doc"></a>

### Extracting text from **doc** and **docx**:

```python
import docx2txt

def extract_text_from_doc(doc_path):
    temp = docx2txt.process("resumes/Chinmaya_Kaundanya_Resume.docx")
    text = [line.replace('\t', ' ') for line in temp.split('\n') if line]
    return ' '.join(text)
```

<a id="second-step"></a>

# Second Step: Extracting Name

For extracting names from resumes, we can make use of regular expressions. But we will use a more sophisticated tool called [spaCy](https://spacy.io/). **Spacy is a Industrial-Strength Natural Language Processing module used for text and language processing**. It comes with pre-trained models for tagging, parsing and entity recognition. Our main moto here is to use [Entity Recognition](https://en.wikipedia.org/wiki/Named-entity_recognition) for extracting names (after all name is entity!). No doubt, spaCy has become my favorite tool for language processing these days. So lets get started by installing spacy. 

<a id="installing-spacy"></a>

### Installing `spaCy`:

```bash
pip install spacy
```

Now, we want to download pre-trained models from spacy. For this we need to execute:

```bash
python -m spacy download en_core_web_sm
```

<a id="rule-based-matching"></a>

### Rule Based Matching:

`spaCy` gives us the ability to process text or language based on [Rule Based Matching](https://spacy.io/usage/linguistic-features#rule-based-matching). We will be using this feature of spaCy to extract first name and last name from our resumes.

```python
import spacy
from spacy.matcher import Matcher

# load pre-trained model
nlp = spacy.load('en_core_web_sm')

# initialize matcher with a vocab
matcher = Matcher(nlp.vocab)

def extract_name(resume_text):
    nlp_text = nlp(resume_text)
    
    # First name and Last name are always Proper Nouns
    pattern = [{'POS': 'PROPN'}, {'POS': 'PROPN'}]
    
    matcher.add('NAME', None, *pattern)
    
    matches = matcher(nlp_text)
    
    for match_id, start, end in matches:
        span = nlp_text[start:end]
        return span.text
```

As you can observe above, we have first defined a pattern that we want to search in our text. Here, we have created a simple pattern based on the fact that *First Name* and *Last Name* of a person is always a **Proper Noun**. Hence we have specified spacy that searches for a pattern such that two continuous words whose part of speech tag is equal to `PROPN` (Proper Noun).

<a id="third-step"></a>

# Third Step: Extracting Phone Numbers

For extracting phone numbers, we will be making use of regular expressions. Phone numbers also have multiple forms such as `(+91) 1234567890` or `+911234567890` or `+91 123 456 7890` or `+91 1234567890`. Hence, we need to define a generic regular expression that can match all similar combinations of phone numbers. Thanks to [this](https://zapier.com/blog/extract-links-email-phone-regex/) blog, I was able to extract phone numbers from resume text by making slight tweaks.

Our phone number extraction function will be as follows:

```python 
import re

def extract_mobile_number(text):
    phone = re.findall(re.compile(r'(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?'), text)
    
    if phone:
        number = ''.join(phone[0])
        if len(number) > 10:
            return '+' + number
        else:
            return number
```

For more explaination about the above regular expressions, visit [this](https://regexr.com/) website.

<a id="forth-step"></a>

# Forth Step: Extracting Email

For extracting Email IDs from resume, we can use a similar approach that we used for extracting mobile numbers. Email IDs have a fixed form i.e. an `alphanumeric string` should follow a `@` symbol, again followed by a `string`, followed by a `.` (dot) and a `string` at the end. We can use regular expression to extract such expression from text.

```python
import re

def extract_email(email):
    email = re.findall("([^@|\s]+@[^@]+\.[^@|\s]+)", email)
    if email:
        try:
            return email[0].split()[0].strip(';')
        except IndexError:
            return None
```

<a id="fifth-step"></a>

# Fifth Step: Extracting Skills

Now that we have extracted some basic information about the person, lets extract the thing that matters the most from a recruiter point of view, i.e. skills. We can extract skills using a technique called [tokenization](https://textminingonline.com/dive-into-nltk-part-ii-sentence-tokenize-and-word-tokenize). Tokenization simply is ***breaking down*** of text into paragraphs, paragraphs into sentences, sentences into words. Hence, there are two major techniques of tokenization: `Sentence Tokenization` and `Word Tokenization`.

Before implementing tokenization, we will have to create a dataset against which we can compare the skills in a particular resume. For this we will make a comma separated values file (`.csv`) with desired skillsets. For example, if I am the recruiter and I am looking for a candidate with skills including NLP, ML, AI then I can make a csv file with contents:

```bash
machine learning,ml,artificial intelligence,ai,natural language processing,nlp
```

Assuming we gave the above file, a name as `skills.csv`, we can move further to tokenize our extracted text and compare the skills against the ones in `skills.csv` file. For reading csv file, we will be using the `pandas` module. After reading the file, we will removing all the [stop words](https://en.wikipedia.org/wiki/Stop_words) from our resume text. ***In short, a stop word is a word which does not change the meaning of the sentence even if it is removed***.

<a id="installing-pandas"></a>

### Installing `pandas`:

```bash
pip install pandas
```

<a id="word-token"></a>

### Word Tokenization and Extraction:

```python
import pandas as pd
import spacy

# load pre-trained model
nlp = spacy.load('en_core_web_sm')
noun_chunks = nlp.noun_chunks

def extract_skills(resume_text):
    nlp_text = nlp(resume_text)

    # removing stop words and implementing word tokenization
    tokens = [token.text for token in nlp_text if not token.is_stop]
    
    # reading the csv file
    data = pd.read_csv("skills.csv") 
    
    # extract values
    skills = list(data.columns.values)
    
    skillset = []
    
    # check for one-grams (example: python)
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token)
    
    # check for bi-grams and tri-grams (example: machine learning)
    for token in noun_chunks:
        token = token.text.lower().strip()
        if token in skills:
            skillset.append(token)
    
    return [i.capitalize() for i in set([i.lower() for i in skillset])]
```

<a id="sixth-step"></a>

# Sixth Step: Extracting Education:

Now, moving towards the last step of our resume parser, we will be extracting the candidates education details. The details that we will be specifically extracting are the degree and the year of passing. For example, XYZ has completed MS in 2018, then we will be extracting a tuple like `('MS', '2018')`. For this we will be requiring to discard all the stop words. We will be using `nltk` module to load an entire list of stopwords and later on discard those from our resume text.

### Installing `nltk`:

```bash
pip install nltk
python -m nltk nltk.download('words')
```

Recruiters are very specific about the minimum education/degree required for a particular job. Hence, we will be preparing a list `EDUCATION` that will specify all the equivalent degrees that are as per requirements.

```python
import re
import spacy
from nltk.corpus import stopwords

# load pre-trained model
nlp = spacy.load('en_core_web_sm')

# Grad all general stop words
STOPWORDS = set(stopwords.words('english'))

# Education Degrees
EDUCATION = [
            'BE','B.E.', 'B.E', 'BS', 'B.S', 
            'ME', 'M.E', 'M.E.', 'MS', 'M.S', 
            'BTECH', 'B.TECH', 'M.TECH', 'MTECH', 
            'SSC', 'HSC', 'CBSE', 'ICSE', 'X', 'XII'
        ]

def extract_education(resume_text):
    nlp_text = nlp(resume_text)

    # Sentence Tokenizer
    nlp_text = [sent.string.strip() for sent in nlp_text.sents]

    edu = {}
    # Extract education degree
    for index, text in enumerate(nlp_text):
        for tex in text.split():
            # Replace all special symbols
            tex = re.sub(r'[?|$|.|!|,]', r'', tex)
            if tex.upper() in EDUCATION and tex not in STOPWORDS:
                edu[tex] = text + nlp_text[index + 1]

    # Extract year
    education = []
    for key in edu.keys():
        year = re.search(re.compile(r'(((20|19)(\d{2})))'), edu[key])
        if year:
            education.append((key, ''.join(year[0])))
        else:
            education.append(key)
    return education
```

This is how we can implement our own resume parser. It's fun, isn't it? You can play with words, sentences and of course grammar too! On integrating above steps together we can extract the entities and get our final result as:

```python
{
    'education': [('BE', '2014')],
    'email': 'omkarpathak27@gmail.com',
    'mobile_number': '8087996634',
    'name': 'Omkar Pathak',
    'skills': [
        'Flask',
        'Django',
        'Mysql',
        'C',
        'Css',
        'Html',
        'Js',
        'Machine learning',
        'C++',
        'Algorithms',
        'Github',
        'Php',
        'Python',
        'Opencv'
    ]
}
```

Entire code can be found on [github](https://github.com/OmkarPathak/ResumeParser). Feel free to open any issues you are facing. You can contribute too! Have an idea to help make code even better? Open a Pull Request :)