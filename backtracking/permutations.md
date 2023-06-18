# [Question](https://leetcode.com/problems/permutations/)
Difficulty: Medium
# Goal
Find all the permutations of a given array. The array has unique numbers.
# Solution
## Trick
Imagine it like a tree. The root node has n nodes as children, each of these nodes have n-1 nodes as children, and so on. These nodes represent the numbers in the array availaible to this node as a choice. 

So it's recursion. Inside the recursion, we pass in a modified array that has the current number removed from it. This way, we go from n choices, to n-1 choices and bla bla. 
## Code
```cpp
class Solution {
public:
    vector<vector<int>> result;
    vector<int> temp;

    vector<vector<int>> permute(vector<int>& nums) {
        helper(nums);
        return result;
    }
    void helper(vector<int>& numbers) {
        if (numbers.size() == 0) {
            result.push_back(temp);
            return;
        }

        for (int i = 0; i < numbers.size(); i++) {
            int num = numbers[i];
            numbers.erase(numbers.begin() + i);
            temp.push_back(num);

            helper(numbers);

            numbers.insert(numbers.begin() + i, num);
            temp.pop_back();
        }
    }
};
```
## Time Complexity: $O(n\cdot n!)$

Each time we do a recursive call, we modify the array. this takes $O(n)$ time. We do this $n!$ times. So, $O(n\cdot n!)$