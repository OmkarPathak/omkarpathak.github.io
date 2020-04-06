---
layout: page
title: Resume Parser
permalink: /projects/resume-parser/
description: A simple resume parser used for extracting information from resumes
image: https://www.omkarpathak.in/projects/Resume-Parser/resume_parser_result.png
keywords: omkar pathak, omkar pathak resume parser, resume parser, django, nltk, spacy, nlp spacy, nltk nlp,
          omkar nlp, omkar spacy
---

# Resume Parser
What is the project all about?

- Easily extracting information from resumes
- Information like Name, Email, Mobile Number, Skills, Education, Experience can be extracted
- NLP used for information extraction
- CLI and GUI interfaces available
- PDF, doc, docx formats supported

## Results

### CLI

The module would return a list of dictionary objects with result as follows:

```
[
    {
        'experience': 'Truso Pune',
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
]
```

### GUI

![Working]({{ "projects/Resume-Parser/resume_parser_result.png" | relative_url }})

Supporting blog post about how I got here, what all modules did I use, what approaches had been taken can be found here: [https://omkarpathak.in/2018/12/18/writing-your-own-resume-parser/](https://omkarpathak.in/2018/12/18/writing-your-own-resume-parser/)

**Source Code**: [Github](https://github.com/OmkarPathak/ResumeParser)

**Technology Used**: Python, Django, NLTK, SpaCy