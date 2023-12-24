# [Question](https://leetcode.com/problems/combination-sum/)
Difficulty: Medium (bit difficult to imagine recursion)
# Goal
Given target and a list of numbers, find all the combinations of numbers that add up to target. You can use a number as many times as you want. The numbers in the list are unique.
# Solution
## Trick
Think of it this way, for each number, you have whole array/vector/list as a choice to add to it to generate a sum. This sum also has the whole array as to add to it. So, you can see that this is a recursive problem. 

Couldn't figure out myself so looked at neetcode's solution. One slight optimization that can be done is sort the array, this way if you overshoot the sum, you can break the loop.

One importent point - in each recursive call, we pass in the index to start our next loop from, this way we don't get combinations that are already generated.
## Code
```cpp
class Solution {
private:
    vector<int> temp;
    vector<vector<int>> ans;

    bool helper(int target, int index, int sum, vector<int> &candid){
        if(sum > target)
            return true;
        if(sum == target){
            ans.push_back(temp);
            return true;
        }
        for (int i = index; i < candid.size(); i++)
        {
            temp.push_back(candid[i]);

            if(helper(target, i, sum + candid[i], candid))
            {
                temp.pop_back();
                break;
            }
            temp.pop_back();
        }
        return false;
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        helper(target, 0, 0, candidates);
        return ans;
    }
};
```
## Time Complexity: ~$O(n^t)$

Each number has $n$ choices, and we have to do this for as many times our sum reaches or overshoots the target. this can be $t$ amount in worst case. So, $O(n^{target})$ or $O(n^t)$