---
layout: post
title: How the development of operating systems gave birth to Open Source
comments: true
description: A brief introduction to the history of Open Source software and how it changed the world
keywords: omkar pathak, blog, open source, operating systems, open source and operating systems, history of open source, development of operating systems, history of development of operating systems, transformation, history of operating systems
image: /public/img/blog-images/history-of-os.png
tags: [website, life]
---

**Index:**

* TOC
{:toc}
# How the development of operating systems gave birth to Open Source

Today's blog post is dedicated to those people without whom I wouldn't be able to write this on my laptop. They were the ones who developed the operating systems, they are the real pioneers of technology, they are the true legends! In this post, we will see the history of operating systems and how this led to the beginning of open source software. I will try to jot down the main events that can be considered as the underpinning incidents of the open source software.

## MULTICS - An Impossible Project

In 1964 General Electric (GE) received a project to develop a versatile operating system that could allow multiple users to access the machine simultaneously. GE didn't have programmers who could write an entire operating system so they involved Bell Labs in this project. After a long struggle, Bell Labs and GE together could not code an entire operating system suitable for their needs. For the same reason, they consulted the Massachusetts Institute of Technology (MIT) to help them in the project. This is how the [MULTICS](https://en.wikipedia.org/wiki/Multics){:target="_blank"} started. However, this project failed miserably with a lot of coding problems and errors. They could not create a suitable product out of it. Bell Labs dropped support from the project in 1969 due to a lack of required developments. [MIT and GE continued development thereafter](https://web.mit.edu/multics-history/){:target="_blank"}.

<div style="text-align: center">
    <img src="{{ 'public/img/blog-images/multics.gif' | relative_url }}">
</div>
<div style="text-align: center; margin-top: 15px; font-size: 10px; color: gray"><p>Image Source: Wikipedia</p></div>

Now, why was this project this important if it was not very successful? Well, because this is considered as the foundation of all the modern operating systems. It was a milestone in the computing and all the other technological advancements that were going to happen. Ken Thompson, in an interview with Peter Seibel, said, Multics as "overdesigned and overbuilt and over everything. It was close to unusable. They [Massachusetts Institute of Technology] still claim it's a monstrous success, but it just clearly wasn't".

## Ken Thompson and the development of Unix

After Bell Labs pulled out of the MULTICS project, [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson){:target="_blank"} emphasized to keep the development of MULTICS operational. He with few fellow programmers from MIT continued the development and this is when UNIX, a single-tasking operating system was born. Ken Thompson along with Dennis Ritchie and few more programmers built UNIX without any organizational support. Ken Thompson decided to release this operating system free to the world. Because of its free nature, it got popular among other programmers in no time. But, as the product was developed using Bell Labs resources, it was then relaunched as a closed source program.

<div style="text-align: center">
    <img src="{{ 'public/img/blog-images/ken_dennis.jpg' | relative_url }}">
</div>
<div style="text-align: center; margin-top: 15px; font-size: 10px; color: gray"><p>Ken Thompson and Dennis Ritchie. Image Source: Wikipedia</p></div>

In 1971, the first version of Unix was released publically, along with its manual called "The UNIX programmers Manual" which enabled developers to have a look at OS details. In the 1980s, many companies started developing their operating system with UNIX as a base. UNIX copies were either taken from AT&T Bell Labs or BSD. Some of the notable mentions of such UNIX flavored operating systems were Sun Solaris, FreeBSD, IBM-AIX, HP-UX.

## Emergence of C programming language

Unix was originally written in Assembly language and B programming language, which is itself complex to write and understand. Ken Thompson wanted a fast programming language to write [some utilities for Unix](https://en.wikipedia.org/wiki/C_(programming_language)#History){:target="_blank"}, which had a simpler syntax which made reading and writing code simpler. This is the reason why B programming language was further modified in [C programming language](http://www.bell-labs.com/usr/dmr/www/chist.html){:target="_blank"} with all the features desired by Dennis Ritchie and Ken Thompson.

<div style="text-align: center">
    <img src="{{ 'public/img/blog-images/c_lang.png' | relative_url }}">
</div>
<div style="text-align: center; margin-top: 15px; font-size: 10px; color: gray"><p>Image Source: Wikipedia</p></div>

In 1973, Unix was completely re-implemented in C. Because of some powerful features like `struct` types, C became more popular amongst developers. In the 1980s, C and its compilers became so popular that it appeared nearly in all machine architectures and operating systems. Later, C became popular as a programming language for personal computers.

## Rise of Berkeley Software Distribution

Early distributions of Unix included source code which arrived at the University of California Berkeley in 1974. Ken Thompson later in 1975 visited UCB as a visiting professor where he helped to install UNIX. At that time, Bill Joy, a Graduate student at UCB, compiled the first version of [Berkeley Software Distribution](https://en.wikipedia.org/wiki/History_of_the_Berkeley_Software_Distribution) which was an enhanced version of UNIX in 1978. It was released under a BSD license which enabled developers to freely distribute this code without any licensing requirement.

**Interestingly, MacOS partly uses FreeBSD** as part of its kernel. So it is safer to say that Unix and BSD are the foundation of all the modern operating systems that we see today.

## Richard Stallman - A man of a kind

When the popularity of Unix and BSD were skyrocketing, there was Richard Matthew Stallman (RMS) who was about to start a movement that could change the world entirely. Before getting into what RMS exactly did, let us look into an [interesting story](https://www.gnu.org/philosophy/rms-nyu-2001-transcript.txt){:target="_blank"} about him. 

<div style="text-align: center">
    <img src="{{ 'public/img/blog-images/rms.jpg' | relative_url }}">
</div>
<div style="text-align: center; margin-top: 15px; font-size: 10px; color: gray"><p>Image Source: Wikipedia</p></div>

RMS was a programmer at MIT Artificial Intelligence Laboratory back in 1971. In the lab, they had a dot-matrix printer developed and gifted by Xerox. Later one day, this printer was jammed due to some technical issues. RMS thought, whenever someone is firing a print command from their computer, they should be notified about this "jamming" of the printer. They wanted this to be fixed. So, they contacted xerox about this, but they refused to take action. RMS later tried opening the software provided by Xerox that would issue a print command to the printer. But, to his surprise that software package was a binary, and Xerox wouldn't let him have the source code. RMS thought, we are the sole owners of that thing and we should be having the freedom to modify it as per our wish. This incident inspired RMS to create something called "Free Software Foundation".

How stubborn is RMS towards free software you may ask? Quite amusingly, he doesn't own a smartphone because he thinks no smartphone entirely runs on free software. He is a legend in himself!

## GPL and the GNU Project

Due to the above incident, RMS felt the need and hence he started developing an operating system that would be entirely free. All the components in the operating system would be made entirely from scratch to ensure it is truly "free". RMS named it [GNU](https://en.wikipedia.org/wiki/GNU_Project) (recursive acronym for 'GNU's Not Unix'). GNU project's development started in 1983. In 1987, an assembler, a free C compiler known as [GCC (GNU Compiler Collection)](https://en.wikipedia.org/wiki/GNU_Compiler_Collection) and other Unix utilities like ls, cd grey, awk were completed. 

<div style="text-align: center">
    <img src="{{ 'public/img/blog-images/gnu.png' | relative_url }}">
</div>
<div style="text-align: center; margin-top: 15px; font-size: 10px; color: gray"><p>A GNU mascot. Image Source: Wikipedia</p></div>

RMS had four major fundamentals for the GNU project and by the term "free software". According to RMS, a "free software" should allow anyone to study, distribute, create, and modify the source code as per his/her wish. And this is considered as the pillar for the current golden era for the open-source software. I consider this step as one of the most impactful moves in the history of the software industry. 

For the GNU project to be fully distributed as free, RMS needed a license that would allow all the users with the freedom they want. For this, GPL (GNU General Public License) was written by RMS. We find a modified version of this license in most of the Github repositories today (generally know as GPL-3). Under this license, users are free to study, create, modify the code, and redistribute it as they want.

## Linux - History is created

In 1991, [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds), a student of the University of Helsinki, started working on his operating system kernel. Linus announced he was working on his kernel, in a [Usenet posting](https://groups.google.com/forum/#!msg/comp.os.minix/dlNtH7RRrGA/SwRavCzVE7gJ). Linus says, many of the operating systems available that time was either not free or came with a license that restricted redistribution. Because of these factors, Linus was compelled to write a kernel of his own. GNU project had operating system utilities ready, but the only thing missing was a kernel. So Linus released Linux under a GPL license. This is how GNU/Linux was formed. Torvalds has stated, "making Linux GPLed was definitely the best thing I ever did". Linus himself believes that "open source is the only way to do software" and hence most of his projects are open-sourced. 

<div style="text-align: center">
    <img src="{{ 'public/img/blog-images/linus.jpeg' | relative_url }}">
</div>
<div style="text-align: center; margin-top: 15px; font-size: 10px; color: gray"><p>Linus Torvalds. Image Source: Wikipedia</p></div>

Linus would have earned millions of dollars had he not open-sourced Linux. But, instead, he created history. I think Linus is a true genius. He transformed the tech industry as no one ever could.

Just to give you a glimpse about how great is Linux, here are [some facts and figures](https://www.omgubuntu.co.uk/2018/08/interesting-facts-about-linux):
- Linux as of 2018, has 20M+ lines of code, of which only 1% is written by Torvalds himself (now you can imagine the power of open source and collaboration)
- Linux is used in every major space program (in fault-tolerant rockets)
- 100% of all supercomputers in the world run Linux!
- Steve Jobs offered Linus Torvalds a job in 2000, on the condition that he stops the development of Linux, of course, Linus declined. Woof!
- 90% of Hollywood visual effects rely on Linux

# References

- [History of Unix](https://en.wikipedia.org/wiki/History_of_Unix)

- [BSD](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution)

- [Richard Stallman's printer incident](https://www.gnu.org/philosophy/rms-nyu-2001-transcript.txt)

# Credits:

This entire blog post is inspired by [this YouTube](https://www.youtube.com/watch?v=wONPcv0CjVw) video: [https://www.youtube.com/watch?v=wONPcv0CjVw](https://www.youtube.com/watch?v=wONPcv0CjVw)