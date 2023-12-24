# [Question](https://leetcode.com/problems/validate-binary-search-tree/)
Difficulty: Medium 
# Goal
Determine if given binary tree is a valid BST
Valid BST has following properties -
1. The left subtree of a node contains only nodes with keys less than the node's key.
2. The right subtree of a node contains only nodes with keys greater than the node's key.
3. Both the left and right subtrees must also be binary search trees.
# Solution
## Trick
My first approach was to just check if left node is less than root and right node is greater than root. But this is not enough. The key thing is "all nodes in left subtree should be less than root node and all nodes in right subtree should be greater than root node".

Neetcode's soln is pretty smart and elegant. Basically every node has upper and lower bound in BST. For the left child, the upper bound is the parent's value and the lower bound is the minimum possible value. For the right child, the lower bound is the parent's value and the upper bound is the maximum possible value. But when we go left then right, we have lower bound as direct parent's value while upper bound is parent's parent value. So we can do this recursively and pass along the upper and lower bounds as we go right and left. Pretty smart and elegant.

My soln came to me after pondering over the question for 3 days. It's the fact that inorder traversal of a BST gives a sorted array. Now the realisation did hit me while thinking abt it in the morning but i'd like to say   
![It was revealed to me in a dream](images/validate_BST.jpg)
## Code
my soln -
```cpp
class Solution 
{
public:
    bool isValidBST(TreeNode* root) 
    {
        helper(root);
        for(int i = 1; i < tree.size(); i++)
        {
            if(tree[i-1]>=tree[i]) return false;
        }
        return true;
    }
    void helper(TreeNode* node){
        if(node == nullptr) return;

        helper(node->left);
        tree.push_back(node->val);
        helper(node->right);

        return;
    }
    vector<int> tree;
};
```

Neetcode's soln -  
Note: We are passing nodes instead of values because then we can easily circumvent the problem of negative infinity and positive infinity as being bounds.
```cpp
class Solution 
{
public:
    bool isValidBST(TreeNode* root) 
    {
        return isValidBST(root, NULL, NULL);
    }

    bool isValidBST(TreeNode* root, TreeNode* minNode, TreeNode* maxNode) 
    {
        if(not root) return true;
        
        if((minNode and root->val <= minNode->val) or (maxNode or root->val >= maxNode->val))
            return false;

        return isValidBST(root->left, minNode, root) and isValidBST(root->right, root, maxNode);
    }
};
```

## Time Complexity: $O(n)$
have to reach each node once.