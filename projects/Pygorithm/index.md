---
layout: page
title: Pygorithm
permalink: /projects/pygorithm/
description: Pygorithm is a Python module which helps students to learn the implementation of all the major data structures and algorithms.
keywords: pygorithm, omkar pathak pygorithm, python algorithms
---

# Pygorithm
What is the project all about?

- A Python module to learn all the major algorithms on the go!
- Users just have to import the required module and they can use the functions, see the code and time complexities
- Documentation can be found [here](http://pygorithm.readthedocs.io/en/latest/)

## Results

* To sort your list

```python
    >>> from pygorithm.sorting import bubble_sort
    >>> my_list = [12, 4, 3, 5, 13, 1, 17, 19, 15]
    >>> sorted_list = bubble_sort.sort(my_list)
    >>> print(sorted_list)
    >>> [1, 3, 4, 5, 12, 13, 15, 17, 19]
```

* To get the code for function used

```python
    >>> from pygorithm.sorting import bubble_sort
    >>> code = bubble_sort.get_code()
    >>> print(code)
```

* To get the time complexity of an algorithm

```python
    >>> from pygorithm.sorting import bubble_sort
    >>> time_complexity = bubble_sort.time_complexities()
    >>> print(time_complexity)
```

**Source Code**: [Github](https://github.com/OmkarPathak/pygorithm)


## Got covered in:

- [ITCodeMonkey](https://www.itcodemonkey.com/article/653.html), Tagged under Hotest Github Project :)

- [ImportPython](http://importpython.com/blog/post/importpython-issue-124-python-packaging-algorithms-easter-eggs-machine-learning-and-more)

- [Fosstack](https://fosstack.com/algorithms-with-python/)

- [FullStackFeed](https://fullstackfeed.com/pygorithm-a-python-module-for-learning-all-major-algorithms/)

- [Ingo Kleiber](https://kleiber.me/blog/2017/08/10/tutorial-decorator-primer/)
