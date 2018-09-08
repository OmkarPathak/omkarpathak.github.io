---
layout: post
title: Demystifying Python OOP (Part 1) - Magic methods or Special methods
comments: true
description: A long description about what are python magic methods or special methods and how to use them
keywords: python, python magic methods, python methods, omkar python, freelance web developer, omkar pathak freelancer pune, pune
image: /public/img/blog-images/python.png
---

In my previous post we talked about Python's `__getitem__` and `__setitem__` methods. These methods are called magic methods or special methods or dunder methods. Well what is the **magic** about these methods? This is exactly what we are going to see today. 

P.S: You will fall in love with Python language (again! ;) )

And it's gonna be a long post. So, let's get started.

# What exactly are magic methods?

Magic methods or Dunder methods are just normal methods but with special powers. **These magic methods in Python, help you to define the *magic* to your classes**. These magic methods are defined by adding double underscores (__) as prefix and suffix to the method name. To be frank, there isn't any magic going on. These methods are not well documented in the Python docs and hence we will be seeing these in detail today.

# Magic methods for Initialization

All Python developers are initially taught that `__init__` is the first method (or the constructor) that is called after a class is created. But `__init__` is not the first method that is been called. Its actually the `__new__` method that is been called initially. 

-   `__new__` takes arguments as *class_name*, *args*, and *kwargs*. `__new__` then passes these       args and kwargs to the *class_name*'s `__init__` method

    -   Syntax: `__new__(class_name, args, kwargs)`

-   `__init__` is the initializer for the class. This is almost globally used for initialization      purposes

    -   Syntax: `__init__(self, args, kwargs)`

-   `__del__` is the destructor of the class. Just note that this does not define the behaviour       of `del x`. It defines the behaviour for when an object is garbage collected

    -   Syntax: `__del__(self)`

Let's look at an example:

```python

class SimpleInit(object):
    '''
        Class to initialize a list with a value
    '''
    def __init__(self, value=10):
        self._list = [value]

    def __del__(self):
        del self._list
```

# Magic Methods for Arithmetic Operations

Arithmetic operations are very common and their magic methods are really handy if you want to create your own data structures. For example, `list` in python concatenate if we do `some_list + some_list2`. Such kind of behaviour can be defined using magic methods for arithmetic operators.

-   `__add__(self, other)` defines addition (`+`)

-   `__sub__(self, other)` defines subtraction (`-`)

-   `__mul__(self, other)` defines multiplication (`*`)

-   `__floordiv__(self, other)` defines integer division (`//`)

-   `__div__(self, other)` defines floating division (`/`)

-   `__mod__(self, other)` defines modulo function (`%`)

-   `__and__(self, other)` defines bitwise *and* (`&`)

-   `__or__(self, other)` defines bitwise *or* (`|`)

-   `__xor__(self, other)` defines bitwise *xor* (`^`)

-   `__pow__(self, other)` defines exponents (`**`)

-   `__lshift__(self, other)` defines bitwise left shift (`<<`)

-   `__rshift__(self, other)` defines bitwise right shift (`>>`)

Example:

```python

class SimpleAdder(object):
    def __init__(self, elements=[]):
        self._list = elements
        
    def __add__(self, other):
        return self._list + other._list
    
    def __str__(self):
        return str(self._list)
    
a = SimpleAdder(elements=[1,2,3,4])
b = SimpleAdder(elements=[2, 3, 4])
print(a + b)    # [1, 2, 3, 4, 2, 3, 4]
```

# Magic methods for Augmented assignment

Python not only allows us to define custom arithmeic operations but also provide the methods for augmented assignment too! For those who don't know what augmented assignment is, let us see that with a simple example. Suppose

```python
    x = 5
    x += 1              # This first adds 5 and 1 and then assigns it back to 'x'
```

Hence there might be a situation where you want to write some custom logic for augmented assignment operators. The supported operations for the same are:

-   `__iadd__(self, other)` defines addition (`+=`)

-   `__isub__(self, other)` defines subtraction (`-=`)

-   `__imul__(self, other)` defines multiplication (`*=`)

-   `__ifloordiv__(self, other)` defines integer division (`//=`)

-   `__idiv__(self, other)` defines floating division (`/=`)

-   `__imod__(self, other)` defines modulo function (`%=`)

-   `__iand__(self, other)` defines bitwise *and* (`&=`)

-   `__ior__(self, other)` defines bitwise *or* (`|=`)

-   `__ixor__(self, other)` defines bitwise *xor* (`^=`)

-   `__ipow__(self, other)` defines exponents (`**=`)

-   `__ilshift__(self, other)` defines bitwise left shift (`<<=`)

-   `__irshift__(self, other)` defines bitwise right shift (`>>=`)

# Magic methods for Comparison

Python has an extensive set of magic methods for comparisons. We can override the default behaviour of comparison operators to make them work with object references. Here's the list of comparison magic methods:

-   `__eq__(self, other)` helps to check the equality of two objects. It defines the behaviour of     equality operator (`==`)

-   `__ne__(self, other)` helps to define the inequality (`!=`) operator

-   `__lt__(self, other)` defines the less-than (`<`) operator

-   `__gt__(self, other)` defines the greater-than (`>`) operator

-   `__le__(self, other)` defines the less-than-or-equal-to (`<=`) operator

-   `__ge__(self, other)` defines the greater-than-or-equal-to (`>=`) operator

Example:

```python

class WordCounter(object):
    '''
        Simple class to count number of words in a sentence
    '''
    def __init__(self, sentence):
        # split the sentence on ' '
        if type(sentence) != str:
            raise TypeError('The sentence should be of type str and not {}'.format(type(sentence)))
        self.sentence = sentence.split(' ')
        self.count    = len(self.sentence)
        
    def __eq__(self, other_class_name):
        '''
            Check the equality w.r.t length of the list with other class
        '''
        return self.count == other_class_name.count
    
    def __lt__(self, other_class_name):
        '''
            Check the less-than w.r.t length of the list with other class
        '''
        return self.count < other_class_name.count
    
    def __gt__(self, other_class_name):
        '''
            Check the greater-than w.r.t length of the list with other class
        '''
        return self.count > other_class_name.count
    
word = WordCounter('Omkar Pathak')
print(word.count)                   # 2
print(word == WordCounter("Omkar")) # False
print(word < WordCounter("Omkar"))  # False
print(word > WordCounter("Omkar"))  # True

```

# Magic methods for type conversion

Many-a-times developers need to typecast their variables to grab the desired results. Python being a dynamically typed language takes care of your data types internally. But hey, Python cares for you too. If you want you can define custom behaviour while casting using these methods:

-   `__int__(self)` defines type conversion to int

-   `__long__(self)` defines type conversion to long

-   `__float__(self)` defines type conversion to float

-   `__complex__(self)` defines type conversion to complex

-   `__oct__(self)` defines type conversion to octal

-   `__hex__(self)` defines type conversion to hexadecimal

-   `__index__(self)` defines type conversion to an int when the object is used in a slice            expression

# Most frequently used Magic Methods

These are some of the magic methods that you will come across frequently:

-   `__str__(self)` defines behaviour for when str() is called. For example, when you call print      (object_name) whatever defined under `__str__()` is executed

-   `__repr__(self)` defines behaviour for when repr() is called. This is very much similar to        `__str__()`. Major difference between these two is that str() is mainly human-readable and        repr() is machine-readable

-   `__hash__(self)` defines behaviour when hash() is called

-   `__len__(self)` returns the length of the container

-   `__getitem__(self)` and `__setitem__(self)`. For more info on them, visit [my previous blog post](https://www.omkarpathak.in/2018/04/11/python-getitem-and-setitem/)

-   `__delitem__(self, key)` defines behaviour when an item is deleted. Example, `del _list[3]`

-   `__iter__(self)` returns an iterator for the container

```python

class CustomList(object):
    def __init__(self, elements=0):
        self.my_custom_list = [0] * elements

    def __str__(self):
        return str(self.my_custom_list)

    def __setitem__(self, index, value):
        self.my_custom_list[index] = value

    def __getitem__(self, index):
        return "Hey you are accessing {} element whose value is: {}".format(index, self.my_custom_list[index])

    def __iter__(self):
        return iter(self.my_custom_list)

obj = CustomList(12)
obj[0] = 1
print(obj[0])
print(obj)
```

So these where **some** of the magic methods that Python gifts you with. There are many many more and you should research about them as and when required. There is a similar blog post I came across when I was researching some of the magic methods, and I highly recommend all to [read this post](https://rszalski.github.io/magicmethods/#comparisons).

If anyone of you know more methods please do mention them in comments or you can directly open a Pull request [here](https://github.com/OmkarPathak/omkarpathak.github.io) if you want to contribute :)