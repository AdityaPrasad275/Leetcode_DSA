# [Question](https://leetcode.com/problems/kth-largest-element-in-a-stream/)
Difficulty: Easy
# Goal
Design a class that takes an integer k and a stream of integers as input and returns the kth largest element in the stream. It supports addition elements and should be able to return the kth largest element at any time.
# Solution
## Trick
The trick is to maintain a k sized min heap. This ensures that the top is the kth largest element. Add all elements of nums in construtor then remove till `minHeap.size() == k`. The minHeap data structure ensures that our 'vector' is always sorted.

<details>
<summary> Why minHeap? </summary>
This was the first question that introduced priority queue or min max heap to me. Without knowing that when i attempted the question, i thought of using llist and maintaining a kth largest element pointer. This means adding an element is llist would take $O(N)$. Using a minHeap reduces this to $log(k)$ !
(the constructor take same time in both llist and minHeap). Also remember, a heap:  

- Stores elements, and can find the smallest (min-heap) or largest (max-heap) element stored in $O(1)$.
- Can add elements and remove the smallest (min-heap) or largest (max-heap) element in $O(log⁡(n))$.
- Can perform insertions and removals while always maintaining the first property.
</details>

## Code
```cpp
class KthLargest {
private:
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;
public:
    KthLargest(int k, vector<int>& nums) 
    {
        this->k = k;
        for(auto n: nums)
            minHeap.push(n);

        while(minHeap.size() > k)
            minHeap.pop();
    }
    
    int add(int val) 
    {
        minHeap.push(val);
        while(minHeap.size() > k)
            minHeap.pop();
            
        return minHeap.top();
    }
};
```
## Time Complexity: $O(nlogn + Mlogk)$
Complexity Analysis

Given $N$ as the length of nums and $M$ as the number of calls to add(),

Time complexity: $O(N⋅log⁡(N)+M⋅log⁡(k))$

The time complexity is split into two parts. First, the constructor needs to turn nums into a heap of size k. In Python, heapq.heapify() can turn nums into a heap in $O(N)$ time. Then, we need to remove from the heap until there are only k elements in it, which means removing $N - k$ elements. Since k can be, say 1, in terms of big $O$ this is $N$ operations, with each operation costing $log⁡(N)$. Therefore, the constructor costs $O(N+N⋅log⁡(N))=O(N⋅log⁡(N))$

Next, every call to add() involves adding an element to heap and potentially removing an element from heap. Since our heap is of size $k$, every call to add() at worst costs $O(2∗log⁡(k))=O(log⁡(k))$. That means M calls to add() costs $O(M⋅log⁡(k))$

Space complexity: $O(N)$

The only extra space we use is the heap. While during add() calls we limit the size of the heap to $k$, in the constructor we start by converting nums into a heap, which means the heap will initially be of size $N$.
