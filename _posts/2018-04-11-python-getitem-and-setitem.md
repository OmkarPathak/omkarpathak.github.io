---
layout: post
title: Using Python __getitem__ and __setitem__
comments: true
description: How to use Python's __getitem__ and __setitem__ properties
keywords: Python, classes, getitem, setitem, python getitem, python setitem, python magic methods, python omkar, omkar pathak getitem, omkar pathak setitem
image: /public/img/blog-images/python.jpg
---

I have always said that I am really fond of Python language. Today I am going to show you another big reason for the same. Python gives most of the flexibility for the developers to develop their code efficiently. And that is why Python allows its user to create their custom classes using the inbuilt classes such as list, str, etc.

Today I am going to demonstrate how to create your own custom datatype like list in Python. We are also going to add some custom fun texts to get things interesting. Now, before going for the actual implementation, consider the following code snippet:

```python
    # create a list with some arbitrary elements
    my_list = [1, 2, 3]

    # print the list
    print(my_list)
    [1, 2, 3]

    # Set the item at index 0 to a value of 4
    >>> my_list[0] = 4

    # Print the value at index 0
    >>> print(my_list[0])
    4
```

As you can observe from above code, we can create a list and then set a value for a specified index and get the value at the specified index. We will be using the same functionality in our custom class that we are about to create.

Initially, we will be creating a simple class with a constructor that we initialize our list with zeros.

```python
    # create our custom list class
    class CustomList(object):
        # constructor
        def __init__(self, elements=1):
            self.my_custom_list = [0] * elements
```

In the above code snippet, what I have done is I have created a simple class called `CustomList`. The constructor of the class i.e `__init__()` will initialize our **my_custom_list** with number of elements that user has specified.

The next step is to wite our own member function to print our **my_custom_list**. For that simply add the following code to the above code:

```python
    def __str__(self):
        return 'Hey these are my contents: ' + str(self.my_custom_list)
```

`__str__()` is called **`Magic Method`** in Python. There are various magic methods in Python and we will be using some of them in a minute. But for now let us understand what is `__str__()`. So basically, *`__str__()`* is a special method which is used to specify the formatting of your class object. In simple words, whenever you call a `print()` on your class object, __str__ specifies what should get printed on that time. Let us try to print our CustomList class now.

```python
    print(CustomList())

    # It prints
    Hey these are my contents: [0]
```

Wow! That's something amazing right. We have successfully created our own class and now we can even print some custom text.

If you have observed in the first code snippet, Python lists can set a value for a specified index and get the value at the specified index. Now, we will be adding these functionalities to our class too. This is how its done:

```python
    # add the following code your class

    # For setting the value
    def __setitem__(self, index, value):
        self.my_custom_list[index] = value

    # For getting the value from our custom_list
    def __getitem__(self, index):
        return "Hey you are accessing {} element whose value is: {}".format(index, self.my_custom_list[index])
```

If we run our program after adding above lines we get something similar as:

```python
    # Create my_custom_list with 12 elements
    obj = CustomList(12)

    # Set value at index 0 to 1
    obj[0] = 1

    # print value at index 0
    print(obj[0])

    # print the whole my_custom_list
    print(obj)

    # Output:
    Hey you are accessing 0 element whose value is: 1
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

Ahaa! Now we can even set an item and retrieve an item from our CustomList class with custom text. Now, you can further play with other magic methods and create your own Custom classes.

Here's the whole code:

```python
    class CustomList(object):
        def __init__(self, elements=0):
            self.my_custom_list = [0] * elements

        def __setitem__(self, index, value):
            self.my_custom_list[index] = value

        def __getitem__(self, index):
            return "Hey you are accessing {} element whose value is: {}".format(index, self.my_custom_list[index])

        def __str__(self):
            return str(self.my_custom_list)

    obj = CustomList(12)
    obj[0] = 1
    print(obj[0])
    print(obj)
```

Hope you enjoyed this small tutorial :)

**Happy Coding!**
