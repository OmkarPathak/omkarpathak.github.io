---
layout: post
title: Demystifying Python OOP (Part 2) - Decorators
comments: true
description: A detailed description about what exactly are Python decorators and how exactly to use them
keywords: python, python decorators, python omkar pathak, omkar python, freelance web developer, omkar pathak freelancer pune, pune, decorators, python decorator
image: /public/img/blog-images/python.png
---

# What are Python Decorators?

Many a times we need to write a wrapper to some code in order to add some custom functionality for that existing code. This is were Python decorators come into picture. In short, Python decorators are used to add some functionality to an existing code. 

To learn decorators, first we will see some basic terminologies and methods required to understand decorators.

# Python Functions

As we all know, Python functions are defined as

```python
def function_name(arguments):
    # function definition
    return something
```

But as Python is dynamically typed programming language, Python gives us flexibility to pass functions as arguments to another functions. Let us illustrate this with an example below:

```python
def add(a, b):
    c = a + b
    return c

def sub(a, b):
    c = a - b
    return c

def perform_operation(function_name, a, b):
    return function_name(a, b)

perform_operation(add, 1, 2)        # returns addition of 1 and 2 i.e. 3
```

As we can observe above, the function `perform_operation()` takes its first argument as function name. Hence, we passed `add()` as argument to it. The other two arguments `a` and `b` are passed as arguments to `add()` function and the addition of `a` and `b` is returned as result.

Similar behaviour is performed by Python's in-built methods like `map()`, `filter()` and `reduce()`. Python also allows us to return a function. For example:

```python
def some_function():
    def nested_function():
        print('In Nested Function Definition')
    return nested_function

my_func = some_function()

my_func()                  # prints 'In Nested Function Definition'
```

Here `nested_function` is defined and returned each time we call `some_function()`. **Note that while returning the `nested_function` we did not include `()` brackets**. This Python property enables us return the function and use it as many times as `my_func()` is called. This type of functions are also called as **Closures**.

# How decorators are defined

Now that we know all the terminologies required to write decorators, let's dig in and write one. Here is a simple decorator example:

```python
def  my_decorator(my_func):
    def inner_function():
        print('I am inside my decorator')
        my_func()
    return inner_function

def my_func():
    print('I am inside my function')

# Calling my_func 
my_func()               # prints 'I am inside my function'

# Calling my_decorator and passing my_func to it as argument
dec = my_decorator(my_func)
dec()

# This prints:
# I am inside my decorator 
# I am inside my function
```

As we can see, we have added some functionality to `my_func()` and hence `my_decorator()` is called as **decorator function**. But while callinig decorators we usually don't have to write `dec = my_decorator(my_func)`. Python provides a shortcut for calling decorators. This can be achieved by adding `@` symbol along with the name of the decorator function and place them above the definition of the function to be decorated. To illustrate this use case, above example can be extended as:

```python
@my_decorator
def my_func():
    print('I am inside my function')
```

is equivalent to

```python
def my_func():
    print('I am inside my function')

dec = my_decorator(my_func)
dec()
```

Let us take one more example use case (a real world use case) to get a clear view about decorators.

We will make a decorator that will calculate execution time for the underlying function.

```python
import time

def timeit(method):
    '''
        A decorator to find the time taken by a code snippet to execute
    '''
    def time_method(*args, **kwargs):
        start = time.time()
        result = method(*args, **kwargs)
        end = time.time()
        print('{}, {}s'.format(method.__name__, (end - start) * 100))
        return result
        
    return time_method

@timeit
def add(a, b):
    return a + b
```

In the above example `timeit()` decorator will calculate the time taken by the function to execute. In this way, decorators can help add some functionaliy using the existing code.

# Decorators with arguments

Just like functions, we can also pass arguments to our decorators. Let us extend our basic decorator:

```python
def my_decorator_with_args(arg1, arg2):
    def my_decorator(my_func):
        def inner_function(*args, **kwargs):
            print('I am inside my decorator and I have ' + arg1 + ' and ' + arg2)
            my_func(*args, *kwargs)
        return inner_function
    return my_decorator

@my_decorator_with_args('potatoes', 'tomatoes')
def my_func(fruit):
    print('I like:', fruit)

my_func('mango')        
# prints 'I am inside my decorator and I have potatoes and tomatoes'
# and then
# prints 'I like: mango' 
```

That was it for decorators. Post any interesting use cases in the comments below. In my next post I'll be posting some fun ways to use Python Static Methods, Abstract Methods and Class Methods in your classes. Till then **Happy Coding! :)**