# [Question](https://leetcode.com/problems/subtree-of-another-tree/)
Difficulty: Easy
# Goal
Given a subtree and a tree, check if the subtree is present in the tree. It should be present in the same form/structure, not just the values.
# Solution
## Trick
Use sameTree function to check at each node whether the subtree represented by this node is same as the given subtree. If it is, return true. If not, check if the subtree is present in the left subtree or right subtree recursively. Use || operator to propagate the result up the tree (because we need just one occurence of the subtree in the tree)
## Code
```cpp
bool isSubtree(TreeNode* root, TreeNode* subRoot) 
{
    if(root == nullptr) return false;
    if(isSameTree(root, subRoot)) return true;

    bool left = isSubtree(root->left, subRoot);
    bool right = isSubtree(root->right, subRoot);
    return left or right;
}
bool isSameTree(TreeNode* p, TreeNode* q) 
{
    if(p == nullptr && q == nullptr) return true;
    if(p == nullptr or q == nullptr or (p->val != q->val)) return false;


    bool isLeftSame = isSameTree(p->left, q->left);
    bool isRightSame = isSameTree(p->right, q->right);

    return isLeftSame and isRightSame;
}
```
## Time Complexity: $O(s\cdot t)$
s is the number of nodes in the tree and t is the number of nodes in the subtree. In worst case, we have to check each node of the tree with the subtree. So, it's $O(s\cdot t)$ in worst case.