# [Question](https://leetcode.com/problems/longest-consecutive-sequence/)
Difficulty: Hard
# Goal
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in $O(n)$ time.  
eg. Input: nums = [100,4,200,1,3,2]  
Output: 4  
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
# Solution
## trick
Convert array to set and then look for every num whose num - 1 doesnt exist. This is the starting of a sequence. Now, go looking for num + 1 and find max seqLength.

Finding in set takes $O(logn)$ time. So we can use count() to check if num - 1 exists or nah in $O(1)$ time.
## Code
```cpp
int longestConsecutive(vector<int>& nums) 
{
    if(nums.size() == 0) return 0;
    
    unordered_set<int> numSet;
    for(auto x: nums) numSet.insert(x);
    
    int maxSeqLength = 1;

    for(int num : nums)
    {
        if(!numSet.count(num - 1))
        {
            int length = 1;
            while(numSet.count(num + length))
                length++;

            maxSeqLength = max(maxSeqLength, length);
        }
    }
    return maxSeqLength;
}
```
## Time Complexity: $O(n)$

If we use find(), our time complexity becomes $O(n^2)$ for unordered_set and $O(nlogn)$ for set. Tho our $O(n)$ time complexity is also abit misleading as average case time complexity of unordered_set count() method is $O(1)$ and worst case is $O(n)$.