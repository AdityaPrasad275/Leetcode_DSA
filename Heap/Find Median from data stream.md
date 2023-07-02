# [Question](https://leetcode.com/problems/find-median-from-data-stream/)
Difficulty: Hard (easy when you know the trick, pretty smarty pants question)
# Goal
Design a data structure that supports the following two operations:
1. void addNum(int num) - Add a integer number from the data stream to the data structure.
2. double findMedian() - Return the median of all elements so far.
# Solution
## Trick
Super smart trick - use two heaps, one min heap and one max heap. The min heap stores the larger half of the numbers, and the max heap stores the smaller half of the numbers. This way, the median is always the top of the min heap, or the top of the max heap, or the average of the two tops. Also it's fast! Only $O(logn)$ time for addNum and $O(1)$ time for findMedian.

Algorithm for addNum-

1. Add the number to the min heap.
2. If the min heap's top is greater than the max heap's top, then pop the min heap's top and push it into the max heap.
3. If the min heap's size is greater than the max heap's size + 1, then pop the min heap's top and push it into the max heap.
4. Same for max heap.

Algorithm for findMedian-
1. The median is the top of the min heap if the min heap's size is greater than the max heap's size, the top of the max heap if the max heap's size is greater than the min heap's size, or the average of the two tops if the min heap's size is equal to the max heap's size.
## Code
```cpp
class MedianFinder {
    priority_queue<int, vector<int>> small; // max heap
    priority_queue<int, vector<int>, greater<int>> large; // min heap
public:
    MedianFinder() {}
    
    void addNum(int num) {
        small.push(num);

        if(not small.empty() and not large.empty() and
           small.top() > large.top())
        {
            large.push(small.top());
            small.pop();
        }

        if(small.size() > large.size() + 1)
        {
            large.push(small.top());
            small.pop();
        }
        
        if(small.size() + 1 < large.size())
        {
            small.push(large.top());
            large.pop();
        }


    }
    
    double findMedian() {
        if(small.size() > large.size())
            return small.top();
        else if(small.size() < large.size())
            return large.top();
        else 
            return (double)(small.top() + large.top())/2;
    }
};
```
## Time Complexity: $O(logn)$ and $O(1)$
AddNum is $O(logn)$ because we are pushing and popping from the heap, and findMedian is $O(1)$ because we are just returning the top of the heap.
## Space Complexity: $O(n)$
