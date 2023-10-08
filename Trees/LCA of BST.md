# [Question](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)
Difficulty: Medium (way too easy because of BST)
# Goal
Find the lowest common ancestor(LCA) of two given nodes in the Binary search tree(BST).
The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow **a node to be a descendant of itself**).
# Solution
## Trick
Just exploit BST's core feature. Smaller values go on left, larger go on right. So if both p and q are smaller than root, then LCA is on left, if both are larger than root, then LCA is on right. If one is smaller and other is larger, then root is LCA. Iteratively update root.
## Code
```cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) 
{
    int small = min(p->val, q->val), large = max(p->val, q->val);

    while(root!=nullptr)
    {
        if(root->val > large) root = root->left;
        else if(root->val < small) root = root->right;
        else return root;
    }
    return root;
}
```
## Time Complexity: Average $O(log n)$, Worst $O(n)$
We're only going to visit one branch of the tree. As usually our tree will have height $O(logn)$,  the time complexity is $O(log n)$. Tho worst case is $O(n)$ if the tree is skewed.