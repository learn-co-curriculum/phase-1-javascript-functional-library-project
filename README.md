# JavaScript Advanced Functions: Build a JavaScript Functional Library

## Introduction

"Functional programming (FP)" is a style of programming like record-oriented or
object-oriented programming. It's very popular in languages that ***LOVE***
functions, like JavaScript.

Don't get spooked though, we've been guiding you and coaching you all along to
think in the "FP" mindset.

Developers learn new paradigms all the time. Today we're going to practice
learning a new style of programming and implementing it.

First, read up on [FP][], and then come back.

## Learning Goals

* Define an IIFE: Instantly-Invoked Function Expression
* Pass data between functions and callbacks
* Call a callback from within a function
* Pass a callback to a function
* Identify JavaScript's non-enforcement of arity

## Instructions

Your functions should conform to the following guidelines:

1. Write pure functions (see article)
2. Avoid sharing or mutating state (see article)
3. Avoid side effects (see article)

Given the same input your functions should always return the same value.

Below you will find a list of function descriptions detailing what their name,
parameters and return value should be. Your job is to develop the code to
implement these functions.

The entire `fi` library should be wrapped in an [Immediately Invoked Function
Expression][IIFE] (IIFE), like the example below.

```javascript
fi = (function() {
  return {
    libraryMethod: function() {
      return "Start by reading the article!";
    },

    each: function() {
      /*TODO*/
    }
  };
})();

fi.libraryMethod();
```

Wrapping a library in code is sometimes called "[The Module Pattern][MP]"

The point of this exercise is to build ***your own implementation*** of the
collection-processing methods. Don't simply re-use the built-in methods!
Leverage all you know about callbacks, passing data, etc. to prove that you
could build your own collection-processing framework whenever ***you*** want.

## Collection Functions (Arrays or Objects)

**fi.each**

`fi.each(collection, callback)`

Iterates over a **collection** of elements, passing each element in turn to a
**callback** function. Each invocation of **callback** is called with three
arguments: (element, index, collection). If **collection** is a JavaScript
object, **callback**'s arguments will be (value, key, collection). **Returns
the original collection for chaining.**

```javascript
fi.each([1, 2, 3], alert);
=> alerts each number in turn and returns the original collection
fi.each({one: 1, two: 2, three: 3}, alert);
=> alerts each number value in turn and returns the original collection
```

**fi.map**

`fi.map(collection, callback)`

Produces a new array of values by mapping each value in **collection** through
a transformation function (**callback**). The callback is passed three
arguments: the value, then the index (or key) of the iteration, and finally a
reference to the entire collection. **Returns a new collection for chaining
without modifying the original.**

```javascript
fi.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]
fi.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]
```

**fi.reduce**

`fi.reduce(collection, callback, acc)`

Reduce boils down a **collection** of values into a single value. **Acc**
(short for accumulator) starts as the initial state of the reduction, and with
each successive step it should be accumulate the return value of **callback**.
The callback is passed three arguments: the acc, the current value in our
iteration (the element in the array), and finally a reference to the entire
collection.

```javascript
var sum = fi.reduce([1, 2, 3], function(acc, val, collection) { return acc + val; }, 0);
=> 6
```

**fi.find**

`fi.find(collection, predicate)`

Looks through each value in the **collection**, returning the first one that
passes a truth test (**predicate**), or undefined if no value passes the test.
The function returns as soon as it finds an acceptable element, and doesn't
traverse the entire collection.

```javascript
var even = fi.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> 2
```

**fi.filter**

`fi.filter(collection, predicate)`

Looks through each value in the **collection**, returning an array of all the
values that pass a truth test (**predicate**).

```javascript
var evens = fi.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> [2, 4, 6]
```

**fi.size**

`fi.size(collection)`

Return the number of values in the **collection**.

```javascript
fi.size({one: 1, two: 2, three: 3});
=> 3
```

## Array Functions

**fi.first**

`fi.first(array, [n])`

Returns the first element of an **array**. Passing **n** will return the first **n** elements of the array.

```javascript
fi.first([5, 4, 3, 2, 1]);
=> 5

fi.first([5, 4, 3, 2, 1], 3);
=> [5, 4, 3]
```

**fi.last**

`fi.last(array, [n])`

Returns the last element of an **array**. Passing **n** will return the last **n** elements of the array.

```javascript
fi.last([5, 4, 3, 2, 1]);
=> 1
```

**fi.compact**

`fi.compact(array)`

Returns a copy of the **array** with all falsy values removed. In JavaScript,
_false_, _null_, _0_, _""_, _undefined_ and _NaN_ are all falsy.

```javascript
fi.compact([0, 1, false, 2, '', 3]);
=> [1, 2, 3]
```

**fi.sortBy**

`fi.sortBy(array, callback)`

Returns a sorted copy of **array**, ranked in ascending order by the results of
running each value through **callback**. The values from the original array
should be retained within the sorted copy, just in ascending order.  

_The point of this exercise is not to write your own sorting algorithm and you are free to use the native [JS sort](https://www.w3schools.com/js/js_array_sort.asp)_

_If you would like to go deeper and try to construct your own sorting algorithm
this is a great extension.
[Here](http://blog.benoitvallon.com/sorting-algorithms-in-javascript/sorting-algorithms-in-javascript-all-the-code/)
is a list of sorting algorithms implemented in JS with additional resources_

```javascript
fi.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num) });
=> [5, 4, 6, 3, 1, 2];


var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
fi.sortBy(stooges, function(stooge){ return stooge.name });
=> [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];
```

**fi.flatten (bonus function)**

`fi.flatten(array, [shallow])`
Flattens a nested **array** (the nesting can be to any depth).

If you pass **true** for the second argument, the array will only be flattened a single level.

```javascript
fi.flatten([1, [2], [3, [[4]]]]);
=> [1, 2, 3, 4];

fi.flatten([1, [2], [3, [[4]]]], true);
=> [1, 2, 3, [[4]]];
```

**fi.uniq**

`fi.uniq(array, [isSorted], [callback])`

Produces a duplicate-free version of the **array**, using _===_ to test object equality. In particular only the first occurrence of each value is kept.

```javascript
fi.uniq([1, 2, 1, 4, 1, 3]);
=> [1, 2, 4, 3]
```

If you know in advance that the **array** is sorted, passing _true_ for **isSorted** will run a much faster algorithm. 

```javascript
fi.uniq(['a', 'a', 'b', 'c', 'e', 'e', 'e', 'e'], true)
=> ['a', 'b', 'c', 'e'] // faster than unsorted
```

If you want to compute unique items based on a transformation, pass a **callback** function.

Specifically, if the callback function returns the same value that a previous execution of the callback also returned, we don't include that item in the return array - even if the original array's elements are different. The output array will be made up of a subset of the values of the original array - not the transformed values.

```javascript
fi.uniq([1, 2, 3, 6], false, (x => x % 3));
=> [1, 2, 3]
fi.uniq([4,8,6,5,7], false, (x => x % 3));
=> [4,8,6]
```

## Function

## Object Functions

**fi.keys**

`fi.keys(object)`

Retrieve all the names of the **object**'s own enumerable properties.

```javascript
fi.keys({one: 1, two: 2, three: 3});
=> ["one", "two", "three"]
```

**fi.values**

`fi.values(object)`
Return all of the values of the **object**'s own properties.

```javascript
fi.values({one: 1, two: 2, three: 3});
=> [1, 2, 3]
```

**fi.functions**

`fi.functions(object)`

Returns a sorted collection of the names of every function in an object — that is to say, the name of every property whose value is a function.

```javascript
fi.functions(fi);
=> ["compact", "each", "filter", "find", "first", "functions", "last", "map", "reduce", "size", "sortBy"]
```

## Conclusion

Building a functional library is a great experience for learning to see how
many functions can build off of each other. This lab asked you to take on some
of the basic tasks that you would face when writing a functional library.

Expand your vocabulary by visiting a library like [lodash][] or [ramda][]. Look
at methods like Ramda's [filter][] or [flip][]. Can you imagine how to write
that? These libraries are providing the functionality just like you did too!

You've pushed your skills to a whole new level. Congratulations!

## Resources

* [lodash][]
* [ramda][]

[lodash]: https://lodash.com
[ramda]: https://ramdajs.com/docs/
[filter]: https://ramdajs.com/docs/#filter
[flip]: https://ramdajs.com/docs/#flip
[FP]: https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0
[IIFE]: https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
[MP]: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
