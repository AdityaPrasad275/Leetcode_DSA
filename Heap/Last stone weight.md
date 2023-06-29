# [Question](https://leetcode.com/problems/last-stone-weight/)
Difficulty: Easy
# Goal
Removing the 'story' of the problem, we are given an array of nums. We are to repetedly do the following operation till our array reduces to size 0 or 1 -
- Take largest and second largest, remove these elements and if they are unequal add (largest - second largest) to the array, if they are equal don't add anything.
# Solution
## Trick
Use maxHeap data structure for this. pop() two times, get the largest and second largest and add (largest - second largest) to the maxHeap. Once you reach the integer 0 or your size becomes 1, you stop and return top of maxHeap.
Not caring abt 'add (largest - second largest) only if they are unequal' and just adding the difference is neat little trick. This works because of constraint that integers in array are between 1 and 1000.
## Code
```cpp
int lastStoneWeight(vector<int>& stones) 
{
    priority_queue<int, vector<int>> maxHeap;

    for(auto s:stones)
        maxHeap.push(s);

    while(maxHeap.top() != 0 && maxHeap.size() > 1)
    {
        int a = maxHeap.top();
        maxHeap.pop();
        int b = maxHeap.top();
        maxHeap.pop();
        
        maxHeap.push(a-b);
    }
    return maxHeap.top();
}
```
## Time Complexity: $O(n)$