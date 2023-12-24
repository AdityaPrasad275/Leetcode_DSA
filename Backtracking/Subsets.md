# [Question](https://leetcode.com/problems/subsets/)
Difficulty: Medium 
# Goal
Find all subsets(the power set) of a given set of unique integers.
# Solution
## Trick
Use recursion! In each recursive call you can decide whether to include the current element or not. You can do this smartly by pushing the current element in to temp vector and then calling the recursive function. After the recursive call, pop the current element from the temp vector and call the recursive function again. 

This is how us mortals think. There is another (maybe better) way to do this (it takes less space i think....)
<details>
<summary><span style="font-size: larger;"><b>The dark magic of bit manipulation</b></span></summary>

```cpp
vector<vector<int>> subsets(vector<int>& n) 
{
    vector<vector<int>> s;
    vector<int> t;
    // Iterate over all numbers from 0 to 2^n.size() - 1
    for(int i=0; i<(1<<n.size()); i++) 
    {
        t.clear(); // Clear the temporary vector
        // Iterate over each bit of the number i
        for(int j=0; j<n.size(); j++) 
        {
            // If the j-th bit of i is set (i.e., 1), add n[j] to the subset
            if(i & (1<<j))
                t.push_back(n[j]);
        }
        // Add the current subset to the result vector
        s.push_back(t);
    }
    // Return all subsets
    return s;
}
```
Here's chatgpt explaining the above code:  

The code uses a bit manipulation technique to generate all possible subsets of the input vector n. Here's how it works:

1. The vector s is initialized to store all subsets.
2. A temporary vector t is created to represent a subset.
3. The outer loop iterates from i = 0 to (1 << n.size()) - 1. This loop generates all possible combinations of bits representing subsets.
4. Inside the outer loop, the temporary vector t is cleared to prepare for a new subset.
5. The inner loop iterates from j = 0 to n.size() - 1. This loop checks each bit of the number i.
6. If the j-th bit of i is set (i.e., 1), it means the j-th element of the input vector n should be included in the current subset. So, n[j] is added to the temporary vector t.
7. After the inner loop completes, the current subset stored in t is added to the vector of subsets s.
8. Finally, when all possible subsets have been generated, the vector s is returned as the result.  

In summary, the subsets function generates all possible subsets of the input vector using a bit manipulation technique and returns them as a vector of vectors.
</details>

## Code
```cpp
class Solution 
{
public:
    vector<vector<int>> ans;
    vector<int> temp;
    vector<vector<int>> subsets(vector<int>& nums) 
    {
        helper(nums, 0);
        return ans;
    }
    void helper(vector<int>& nums, int index)
    {
        if(index == nums.size())
        {
            ans.push_back(temp);
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
## Time Complexity: $O(2^n)$
We're making all subsets of a set of size n. So the time complexity is $O(2^n)$ , same with space.