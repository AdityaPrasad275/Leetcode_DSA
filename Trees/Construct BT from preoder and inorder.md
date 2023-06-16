# [Question](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
Difficulty: 
# Goal
Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree. These two arrays are enough to uniquely determine the binary tree.
# Solution
## Trick
The first element of preorder is the root of the tree. We find the index of this element in inorder array. All elements to the left of this index are in the left subtree and all elements to the right of this index are in the right subtree. We recursively call the function on the left and right subtrees making slices of preorder and inorder arrays. Because cpp doesnt implictly have slicing, i just coded it in python (kinda just copied from neetcode, too bored to implement). Indexing is a bit wierd, [neetcode](https://youtu.be/ihj4IQGZ2zc) explains it best
## Code
```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not preorder or not inorder:
            return None

        root = TreeNode(preorder[0])
        mid = inorder.index(preorder[0])
        root.left = self.buildTree(preorder[1 : mid + 1], inorder[:mid])
        root.right = self.buildTree(preorder[mid + 1 :], inorder[mid + 1 :])
        return root

```
## Time Complexity: $O(n)$
