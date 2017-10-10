# Build a JS functional library

## Project guidelines
Your assignment today is to build the `fi` JS library. This is a toolset of useful functional programming helpers, following the [functional programming](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0) paradigm.

Your functions should conform to the following guidelines:

1. Write pure functions
2. Avoid sharing or mutating state
3. Avoid side effects

Given the same input your functions should always return the same value.

## Instructions
Below you will find a list of function descriptions detailing what their name, parameters and return value should be. Your job is to develop the code to implement these functions.

The entire fi library should be wrapped in an [Immediately Invoked Function Expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) (IIFE), like the example below.


```javascript
fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },
    
    each: function() {/*TODO*/},
  }
})()

fi.libraryMethod()
```

More info on the [Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)

## Collection Functions (Arrays or Objects)

**fi.each**

`fi.each(list, iteratee, [context])`

Iterates over a **list** of elements, yielding each in turn to an **iteratee** function. The **iteratee** is bound to the **context** object, if one is passed. Each invocation of **iteratee** is called with three arguments: (element, index, list). If **list** is a JavaScript object, **iteratee**'s arguments will be (value, key, list). **Returns the original list for chaining.**

```javascript
fi.each([1, 2, 3], alert);
=> alerts each number in turn and returns the original list
fi.each({one: 1, two: 2, three: 3}, alert);
=> alerts each number value in turn and returns the original list
```


**fi.map**

`fi.map(list, iteratee, [context])`


Produces a new array of values by mapping each value in **list** through a transformation function (**iteratee**). The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list. **Returns the modified list for chaining.**

```javascript
fi.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]
fi.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]
```

**fi.reduce**

`fi.reduce(list, iteratee, [memo], [context])`

Reduce boils down a **list** of values into a single value. **Memo** is the initial state of the reduction, and each successive step of it should be returned by the **iteratee**. The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, and finally a reference to the entire list.

If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list. The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.

```javascript
var sum = fi.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
=> 6
```


**fi.find**

`fi.find(list, predicate, [context])`

Looks through each value in the **list**, returning the first one that passes a truth test (**predicate**), or undefined if no value passes the test. The function returns as soon as it finds an acceptable element, and doesn't traverse the entire list.

```javascript
var even = fi.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> 2
```

**fi.filter**

`fi.filter(list, predicate, [context])`

Looks through each value in the **list**, returning an array of all the values that pass a truth test (**predicate**).

```javascript
var evens = fi.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> [2, 4, 6]
```

**fi.size**

`fi.size(list)`

Return the number of values in the **list**.

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

Returns a copy of the **array** with all falsy values removed. In JavaScript, _false_, _null_, _0_, _""_, _undefined_ and _NaN_ are all falsy.

```javascript
fi.compact([0, 1, false, 2, '', 3]);
=> [1, 2, 3]
```

**fi.sortBy**

`fi.sortBy(array, iteratee, [context])`

Returns a sorted copy of **array**, ranked in ascending order by the results of running each value through **iteratee**.
*The point of this exercise is not to write your own sorting algorithm and you are free to use the native [JS sort](https://www.w3schools.com/js/js_array_sort.asp)*

*If you would like to go deeper and try to construct your own sorting algortithm this is a great extension. [Here](http://blog.benoitvallon.com/sorting-algorithms-in-javascript/sorting-algorithms-in-javascript-all-the-code/) is a list of sorting algorithms implemented in JS with additional resources *

```javascript
fi.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });
=> [5, 4, 6, 3, 1, 2]


var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
fi.sortBy(stooges, function(stooge){ return stooge.name});
=> [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];
```


**fi.flatten (bonus function)**

`fi.flatten(array, [shallow])`
Flattens a nested **array** (the nesting can be to any depth).

If you pass **shallow**, the array will only be flattened a single level.

```javascript
fi.flatten([1, [2], [3, [[4]]]]);
=> [1, 2, 3, 4];

fi.flatten([1, [2], [3, [[4]]]], true);
=> [1, 2, 3, [[4]]];
```

**fi.uniq**

`fi.uniq(array, [isSorted], [iteratee])`

Produces a duplicate-free version of the **array**, using _===_ to test object equality. In particular only the first occurrence of each value is kept. If you know in advance that the **array** is sorted, passing _true_ for **isSorted** will run a much faster algorithm. If you want to compute unique items based on a transformation, pass an **iteratee** function.

```javascript
fi.uniq([1, 2, 1, 4, 1, 3]);
=> [1, 2, 4, 3]
```

## Function

**fi.bind (bonus function)**

`fi.bind(function, object)`

Bind a **function** to an **object**, meaning that whenever the function is called, the value of _this_ will be the **object**.

```javascript
var func = function(greeting){ return greeting + ': ' + this.name };
func = fi.bind(func, {name: 'moe'}, 'hi');
func();
=> 'hi: moe'
```

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

Returns a sorted list of the names of every method in an object — that is to say, the name of every function property of the object.

```javascript

fi.functions(fi);
=> ["compact", "each", "filter", "find", "first", "functions", "last", "map", "reduce", "size", "sortBy"]
```

**fi.giveMeMore**

If you are reading this come to us for more functions assignments.
