---
layout: post
title: Demystifying Python OOP (Part 3) - Python Static, Class and Abstract methods 
comments: true
description: A detailed guide for using Python's Static, Class and Abstract methods
keywords: python, python abstract, python class, python abstract methods, method, python omkar pathak, omkar python, freelance web developer, omkar pathak freelancer pune, pune, python static ethod, static
image: /public/img/blog-images/python.png
---

Many times while code reviews, I have seen people defining their classes and methods but incorrectly using decorators that Python provides for methods. So today I am going to talk more about these decorators and how and why to use them. We will see couple of real world scenarios where we can use them.

In this blog post, we will first take an example and then will break it down to dig more into these concepts. So here's our first example:

```python
class ExampleClass(object):
    def some_method(self):
        pass

    @classmethod
    def class_method(cls):
        pass

    @staticmethod
    def static_method():
        pass
```

# Instance / Object methods:

In our example above, `some_method()` is called the object method or instance method. The method takes one paramater *self*, which points to an instance of class `ExampleClass` when the method is called.

As we already know, using *self* parameter, instance methods can access member functions and other member variables of the class. This is the method that you will use most of the times while programming in Python.

Let's take a simplistic example:

Let us say we have a simple `Animal` class. Animal class has a member variable as `count` that stores the count of the total Animals. 

```python
class Animal(object):
    count = 1
    
    def get_count(self):
        return self.count

# access the get_count() by instance of the class
animal = Animal()
animal.get_count()             # 1
```

So we can access the `get_count` method by referencing class instance `animal`. What would happen if we try to do this:

```python
class Animal(object):
    count = 1
    
    def get_count(self):
        return self.count

print(Animal.get_count())
# TypeError: get_count() missing 1 required positional argument: 'self'
```

When executing above, we get `TypeError: get_count() missing 1 required positional argument: 'self'`. This means the methods of the class can only be called by referencing to instances of that class. If we want to use `Animal.get_count()` as it is, we can make use of class methods. 

# Class Methods:

Class methods in Python can be defined by assigning `@classmethod` to any method. The thing to note here is that the class methods take `cls` parameter that points to a class and not the instance of the class. 

Well what does that mean? Let us break this down. `class_method()` takes `cls` as argument that means any class that we specify here is able to access to its own members and not the instance state. I know it's a bit hard to understand. Hence, let us take a simple example to see what exactly are class methods.

We have our Animal class defined as:

```python
class Animal(object):
    count = 1
    
    def get_count(self):
        return self.count

# access the get_count() by instance of the class
animal = Animal()
animal.get_count()             # 1
```

Now, if we want to increase the count by accessing the class itself and not by its instance, we can make use of class method like:

```python
class Animal(object):
    count = 1
    
    def get_count(self):
        return self.count

    @classmethod
    def inc_count(cls):
        cls.count += 1         # increment the count one
        return cls()

animal = Animal.inc_count()    # inc count by accessing class directly
animal.get_count()             # 2
animal.inc_count()             # inc count by referencing the class instance (not recommended)
animal.get_count()             # 3
```

So long story short, class methods give us the power to access a method using reference to class itself rather than instance of that class.

Another thing to note here that `self` and `cls` are just the naming conventions that are followed by most of the Python programmers. You can give any name for those parameters just the mandatory thing is that they should be placed first in the arguments list.

# Static Methods:

Now, let's see what are static methods. Like any function that we call, static methods can be called in a similar way. Hence, static methods are like regular functions just with the fact that they belong to a class's namespace.

Static methods can be defined by decorating methods with `@staticmethod` decorator.

As static methods do not take `self` and `cls` as parameters, they do not have access to class members and variables.

```python
class Example(object):
    @staticmethod
    def just_another_method():
        print('This is static method')

example = Example()
example.just_another_method()   # This is static method
```

# Abstract Methods:

Abstract methods in Python are pretty much different than class methods and static methods. However, while writing Object Orientated programs, abstract methods are used often.

Abstract methods in Python are the methods that are defined in the base class, but do not have any implementation. The derived class *must* override these abstract methods in their definition. Failing to do so will cause `NotImplementedError`. 

For those who are familiar with Java programming language, abstract method in Python are equivalent to interface methods in Java.


```python
class BaseClass(object):
    def do_something(self):
        raise NotImplementedError
```

Any class that will inherit `BaseClass` should override and implement the `do_something()` method, otherwise an exception would be thrown.