# [Question](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
Difficulty: Hard
# Goal
Convert a tree to a string representation. This is serialization. 
Convert this string representation to tree.
# Solution
## Trick
For tree to string, preorder traversal. Add delimiters between numbers, use 'n' or something for nullptrs.

For string to tree, preorder traversal again with annoying string manipulation to extract numbers, nullptrs. 
## Code
```cpp
class Codec {
public:
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        serializeHelper(root);
        return serial;
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        i = 0;
        return deserializeHelper(data);
    }

private:
    void serializeHelper(TreeNode* node) {
        if (!node) {
            serial += nullpointer;
            serial += delimiter;
            return;
        }
        serial += to_string(node->val);
        serial += delimiter;
        serializeHelper(node->left);
        serializeHelper(node->right);
        return;
    }

    TreeNode* deserializeHelper(string& s) {
        if (s[i] == nullpointer){
            i += 2;
            return nullptr;
        }

        j = i;
        while (s[j] != delimiter) {
            j++;
        }
        int val = stoi(s.substr(i, j - i));
        TreeNode* node = new TreeNode(val);

        i = j + 1;
        node->left = deserializeHelper(s);
        node->right = deserializeHelper(s);
        return node;
    }

    char nullpointer = 'n', delimiter = ',';
    int i = 0, j = 0;
    string serial = "";
};
```
## Time Complexity: $O(n)$
