# [Question](https://leetcode.com/problems/diameter-of-binary-tree/)
Difficulty: Easy
# Goal
Find the length of the longest path between any two nodes in a binary tree. This is the diameter. (num nodes - 1 = num edges = diameter)
# Solution
## Trick
trees are easily solved using recursion/dfs. Its the bottom up approach. Start at leaf node, it's height = 1. Then height of parent node = 1 + max(height of left child, height of right child). Using the heights, we can find diameter passing through this node (height right + height left). Using max, we can find maximum diameter of the tree. Recursive approach makes it $O(n)$ as we visit every node once.

It's built on top of maximum depth of binary tree. 
## Code
```cpp
class Solution 
{
public:
    int diameterOfBinaryTree(TreeNode* root) 
    {
        dfs(root);
        return diameter;
    }
    int dfs(TreeNode* root)
    {
        if(root == nullptr) return 0;
        
        int left = dfs(root->left);
        int right = dfs(root->right);
        diameter = max(diameter, right + left);
        return 1 + max(left, right);
    }
    
    int diameter = 0;
};
```
## Time Complexity: $O(n)$