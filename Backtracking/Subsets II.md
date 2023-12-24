# [Question](https://leetcode.com/problems/subsets-ii/)
Difficulty: Medium
# Goal
In this problem, we are given an array of integers that may contain duplicates, we have to find all the subsets of the array, such that no two subsets are same.
# Solution
## Trick
Now if we apply same logic as subset I, we will get duplicate subsets, so we have to remove them. We can simply do this using a set of vectors, and then converting it to a vector of vectors. Remember to sort the array first. That way something like [1, 4] and [4, 1] will not pop up as subset of [4, 1, 4].

This is normal logic. A sort of progression from subset I. Another way to approach this, again with using subset I, is to sort and then simply skip the duplicate elements. It's like when we do the "choose to include this element or not" , if we don't take this element then we don't take the next duplicate elements. This way we can avoid duplicate subsets. Again, sorting is important. 
## Code
First way - using set
```cpp
class Solution {
public:

    set<vector<int>> ansSet;
    vector<vector<int>> ansVec;
    vector<int> temp;

    vector<vector<int>> subsetsWithDup(vector<int>& nums) 
    {
        sort(nums.begin(), nums.end());
        helper(nums, 0);

        for(auto v: ansSet)
            ansVec.push_back(v);

        return ansVec;
    }
    void helper(vector<int>& nums, int index)
    {
        if(index == nums.size()){
            ansSet.insert(temp);
            return;
        }
        
        temp.push_back(nums[index]);
        helper(nums, index + 1);
        
        temp.pop_back();        
        helper(nums, index + 1);
        return;
    }
};
```

Second way - skipping duplicates
```cpp
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) 
    {
        sort(nums.begin(), nums.end());
        
        vector<int> curr;
        vector<vector<int>> result;
        
        dfs(nums, 0, curr, result);
        return result;
    }
private:
    void dfs(vector<int>& nums, int start, vector<int>& curr,vector<vector<int>>& result) 
    {
        result.push_back(curr);
        for (int i = start; i < nums.size(); i++)
        {
            if (i > start && nums[i] == nums[i - 1])
                continue;

            curr.push_back(nums[i]);
            dfs(nums, i + 1, curr, result);
            curr.pop_back();
        }
    }
};
```
comment - this is a very elegant solution. Simple and easy to code. Just a small modification to subset I. Tho proving that this works is a bit tricky.
## Time Complexity: $O(n\cdot 2^n)$
We're making a recursive call for each element in the array, and each recursive call has two branches. So the time complexity is $O(2^n)$, and we're doing this for each element in the array, so the time complexity is $O(n\cdot 2^n)$.