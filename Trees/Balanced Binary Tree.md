# [Question](https://leetcode.com/problems/balanced-binary-tree/)
Difficulty: Easy
# Goal
Check whether tree is height balanced, i.e., the difference between the heights of the left and right subtrees of every node is at most 1.
# Solution
## Trick
Similar to 'maximum depth of binary tree', we can use recursion to find the height of each node. If the difference between the heights of the left and right subtrees of every node is at most 1, then the tree is height balanced. We can use a global variable to keep track of the answer. We just have to change it once we find a node that is not balanced.
## Code
```cpp
class Solution 
{
public:
    bool isBalanced(TreeNode* root) 
    {
        height(root);
        return ans;
    }
    int height(TreeNode* root)
    {
        if(root == nullptr) return 0;

        int leftHeight = height(root->left);
        int rightHeight = height(root->right);

        if(abs(leftHeight - rightHeight) > 1) ans = false;

        return 1 + max(leftHeight, rightHeight);
    }
    bool ans = true;
};
```
## Time Complexity: $O(n)$