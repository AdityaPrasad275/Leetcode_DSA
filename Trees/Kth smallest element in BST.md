# [Question](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
Difficulty: Medium, but very easy
# Goal
Given the root of a BST, find the kth smallest element in it.
# Solution
## Trick
Use inorder traversal to get sorted array and then return kth element. Or maintain a counter.

Inorder traversal is inefficient because we are traversing the whole tree, but we only need to traverse k elements. So, we can stop the traversal when we reach kth element. This is the efficient solution.

## Code
```cpp
class Solution 
{
public:
    int kthSmallest(TreeNode* root, int k) 
    {
        helper(root, k);
        return num;
    }
    void helper(TreeNode* node, int& k)
    {
        if(!node) return;

        helper(node->left, k);
        counter++;
        if(counter == k)
        {
            num = node->val;
            return;
        }
        helper(node->right, k);
        
        return;
    }
    int num;
    int counter = 0;
};
```
## Time Complexity: $O(n)$