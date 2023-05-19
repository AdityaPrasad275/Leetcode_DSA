# [Question](https://leetcode.com/problems/longest-consecutive-sequence/)
Difficulty: Hard
# Goal
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.  
eg. Input: nums = [100,4,200,1,3,2]  
Output: 4  
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
# Solution
## trick
Convert array to hash set and then look for every num whose num - 1 doesnt exist. This is the starting of a sequence. Now, go looking for num + 1 and find max seqLength.
## Code
```
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if(nums.size() == 0) return 0;
        
        set<int> numSet(nums.begin(), nums.end());
        int maxSeqLength = 1;

        for(int num : nums){
            if(numSet.find(num - 1) == numSet.end()){
                int currentNum = num + 1;
                while(numSet.find(currentNum++) != numSet.end())

                maxSeqLength = max(maxSeqLength, currentNum - num);
            }
        }
        return maxSeqLength;
    }
};
```
## Time Complexity: O(n)
It's actually O(n + n) , cuz we touch every element atmost two time, one while confirming (num - 1) exists or nah and when while checking if (num + 1) exists are nah.  
comment: This give a "beats 5% in runtime" because the test cases are so small that O(n log n) becomes faster than O(n).
