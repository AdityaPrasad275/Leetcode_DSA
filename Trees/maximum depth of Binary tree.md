# [Question](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
Difficulty: Easy
# Goal
Given root of binary tree, find the maximum depth of the tree.  
# Solution
## Trick
DFS and BFS. DFS can be implemented using recursion or stack(iterative implementation). BFS can be implemented using dequeue.
## Code
DFS - 
```cpp
int maxDepth(TreeNode* root) {
    if(root == nullptr) return 0;
    int imaxDepth = 1 + max(maxDepth(root->left), maxDepth(root->right));
    return imaxDepth;
}
```
iterative dfs uses stack but i am too lazy, i am not going to implement it. Watch it [here](https://youtu.be/hTM3phVI6YQ?t=643)

BFS - 
```cpp
int maxDepth(TreeNode* root) {
    if(root==nullptr) return 0;

    deque<TreeNode*> q;
    q.push_back(root);
    int level = 0;

    while (!q.empty()){ 
        
        int n = q.size(); 
        while(n--) { 
            TreeNode *node = q. front();
            q.pop_front();

            if (node->left) q.push_back(node->left);
            if (node->right) q.push_back(node->right);
        }

        level++;
    }

    return level;
}
```
## Time Complexity: $O(n)$
reaches every node once