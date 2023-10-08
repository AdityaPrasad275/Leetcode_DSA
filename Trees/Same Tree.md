# [Question](https://leetcode.com/problems/same-tree/)
Difficulty: Easy 
# Goal
Check if two given trees are exactly identical. In structure and values.
# Solution
## Trick
Just recursively check if the left and right subtrees are same. Use && operator to propagate the result up the tree.
## Code
```cpp
bool isSameTree(TreeNode* p, TreeNode* q) 
{
    if(p == nullptr && q == nullptr) return true;
    if(p == nullptr or q == nullptr or (p->val != q->val)) return false;


    bool isLeftSame = isSameTree(p->left, q->left);
    bool isRightSame = isSameTree(p->right, q->right);

    return isLeftSame and isRightSame;
}
```
## Time Complexity: $O(n)$
In same trees, it goes through each node. In cases of difference, it doesn't go further than the first difference. So, it's $O(n)$ in worst case.