# [Question](https://leetcode.com/problems/container-with-most-water/)
Difficulty: Medium
# Goal
Given heights array, find max area contained by height[i] and height[j] in $O(n)$
# Solution
## Trick
Two pointers, L and R. Shift on basis of which pointer points to min(height[L], height[R]). L++, R--.
## Code
```
int maxArea(vector<int>& heights){
    int maxArea = 0;
    int i = 0, j = heights.size() - 1;
    while(i < j){
        maxArea = max(maxArea, min(heights[i], heights[j])*(j - i));
        if(heights[i] < heights[j]) i++;
        else j--;
    }
    return maxArea;
}
```
## Time Complexity:$O(n)$