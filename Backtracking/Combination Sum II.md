# [Question](https://leetcode.com/problems/combination-sum-ii/)
Difficulty: Medium
# Goal
Just like combination sum I, we are given an array of integers and a target, we have to find all the combinations of the array that sum up to the target. The difference is that we can use each element only once. And ofcourse, the result should not contain duplicate combinations.
# Solution
## Trick
It's a combo of subset II and combination sum I. We skip duplicates of an element (trick from subset II), thereby avoiding duplicate combinations and we use same process as combination sum I with one caveat, we don't use the same element again. So, we pass in i+1 as the start index for the next recursive call.
## Code
```cpp
class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) 
    {
        sort(candidates.begin(), candidates.end());
        
        vector<int> curr;
        vector<vector<int>> result;
        
        dfs(candidates, target, 0, 0, curr, result);
        return result;
    }
private:
    void dfs(vector<int>& candidates, int target, int sum, int start, vector<int>& curr, vector<vector<int>>& result) 
    {
        if (sum > target)
            return;

        if (sum == target) {
            result.push_back(curr);
            return;
        }

        for (int i = start; i < candidates.size(); i++) 
        {
            if(i > start && candidates[i] == candidates[i-1]) continue;

            curr.push_back(candidates[i]);
            dfs(candidates, target, sum + candidates[i], i + 1, curr, result);
            curr.pop_back();
        }
    }
};

```
## Time Complexity: $O(2^n)$
It's like taking all subsets of an array, and then checking if they sum up to target. So, $O(2^n)$. But i think sorting the array helps in reducing the time complexity. I am not sure how to formulate this.
