# [A Great resource for stack](https://leetcode.com/discuss/study-guide/2347639/A-comprehensive-guide-and-template-for-monotonic-stack-based-problems)

A bit of notes - 

basically, we insert to stack the indices. We check the top of the stack for a certain condition (less than current element/index, greater than current element/index etc) and if the condition is met, we can pop the top of the stack and "link" the top index to the current index in desired relationship. this checking, popping, linking happens in the while loop and when while loop is exited, the stack is ready to be pushed with the current index. Another "linking" can be done between the current index and the top of the stack at this stage too.

Template - 
```javascript
function buildMonoStack(arr) {
  // initialize an empty stack
  stack = [];
  
  // iterate through all the elements in the array
  for (i = 0 to arr.length - 1)) {
    while (stack is not empty && element represented by stack top `OPERATOR` arr[i]) {
      // if the previous condition is satisfied, we pop the top element
      let stackTop = stack.pop();
  
      // do something with stackTop here e.g.
      // nextGreater[stackTop] = i
    }
  
    if (stack.length) {
      // if stack has some elements left
      // do something with stack top here e.g.
      // previousGreater[i] = stack.at(-1)
    }

    // at the ened, we push the current index into the stack
     stack.push(i);
  }
  
  // At all points in time, the stack maintains its monotonic property
}
```

![hi](https://assets.leetcode.com/users/images/3b666e9c-4200-4245-bce8-7d7e81649f8f_1659039679.8631365.png)

The table below shows the relationship between the current element and the top of the stack, the type of stack (increasing or decreasing), the operator used in the while loop, and the position of the assignment.

| Problem          	| Stack Type                 	| Operator in while loop 	| Assignment Position 	|
|------------------	|----------------------------	|------------------------	|---------------------	|
| next greater     	| decreasing (equal allowed) 	| stackTop < current     	| inside while loop   	|
| previous greater 	| decreasing (strict)        	| stackTop <= current    	| outside while loop  	|
| next smaller     	| increasing (equal allowed) 	| stackTop > current     	| inside while loop   	|
| previous smaller 	| increasing (strict)        	| stackTop >= current    	| outside while loop  	|

The inside while loop and outside while loop is like the timing of "relationship assingment". When inside, the top "looks" towards the current element while when outside while loop the current element "looks" towards the top.

<a name="Questions"></a>
## Questions:

<a href="https://leetcode.com/problems/next-greater-element-ii/">503: Next Greater Element II</a>  
Uses next greater ofcourse. the circular detail of the problem is easily handled by two times looping through the array while maintaining the stack.
  
<a href="https://leetcode.com/problems/daily-temperatures/">739: Daily Temperatures</a>  
Uses next greater! 


<a href="https://leetcode.com/problems/buildings-with-an-ocean-view/">1762: Buildings with an ocean view</a>  
Next greator but without any assingment or fiddling around!

And other questions in the post i wish to understand lol