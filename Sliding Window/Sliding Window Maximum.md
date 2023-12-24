# [Question](https://leetcode.com/problems/sliding-window-maximum/)
Difficulty: Hard (easy when you know the right ds)
# Goal
For an array, output the max for every k size window.The window slies from left to right.
# Solution
## Trick
The core of solving this is using a deque.
A monotonic decreasing stack is what we need with the added functionality that we can remove from front. A deque is perfect for this.
<details>
<summary>long explanation</summary>
Basically, in each window we want to keep track of max elem. And also when this max elem leaves the window, we want the new max elem.
So what we do is, in the deque we add the elements of our array one by one. Let's say [1,3,-1,-3,5,3,6,7] is our array. Now we add 1, then we add 3. But now because 3 is greater than 1, we can disregard 1 because it will never be the max. so our deque will go from [1] to [1, 3] to [3]. Then we add -1. deque = [3, -1]. Then we add -3. deque = [3, -1, -3]. Now because adding 5 would make our deque length > window size. We remove 3 then add 5. [-1, -3, 5]. But now -1, -3 don't have any significance as 5 is greater than both. so our deque becomes [5]. Notice here that in each step our final deque ([1], [3], [3, -1], [3, -1, 3], [5]) , the dq[0] is storing the max element of particular window in step. Now we can only add this dq[0] to our answer vector when thw window in our step matches with the window size. We can do this using r and l pointers. 
</details>

## Code
```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    vector<int> ansVector;
    deque<int> dq;
    int l = 0;
    for (int r = 0; r < nums.size(); r++){
        // removing elements < nums[r] from back and then inserting nums[r] in back
        while(!dq.empty() && nums[*dq.rbegin()] < nums[r])
            dq.pop_back();
        dq.push_back(r);

        if(r-l+1>=k){
            ansVector.push_back(nums[dq[0]]);
            l++;
        }
        if(l>dq[0]) dq.pop_front();
    }
    return ansVector;
}
```
## Time Complexity: $O(n)$
A single loop through the array, and each element is pushed into and popped from deque atmost once. Space complexity is $O(k)$.