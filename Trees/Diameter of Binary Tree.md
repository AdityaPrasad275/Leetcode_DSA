# [Question](https://leetcode.com/problems/diameter-of-binary-tree/)
Difficulty: Easy
# Goal
Find the length of the longest path between any two nodes in a binary tree. This is the diameter. (num nodes - 1 = num edges = diameter)
# Solution
## Trick
trees are easily solved using recursion/dfs. Its the bottom up approach. Start at lead node, it's height = 1. Then height of parent node = 1 + max(height of left child, height of right child). Using the heights, we can find diameter passing through this node (height right + height left). Using max, we can find maximum diameter of the tree. Recursive approach makes it $O(n)$ as we visit every node once.
## Code
```cpp
class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        result = 0; 
        dfs(root);
        return result;
    }
    int dfs(TreeNode* root){
        if(root == nullptr) return 0;
        
        int left = dfs(root->left);
        int right = dfs(root->right);
        result = max(result, right + left);
        return 1 + max(left, right);
    }
    
    int result = 0;
};
```
## Time Complexity: $O(n)$