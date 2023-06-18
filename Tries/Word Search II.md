# [Question](https://leetcode.com/problems/word-search-ii)
Difficulty: H A R D, soul crushing hard.
# Goal
In a 2D board of letters, find ALL THE WORDS in the dictionary that can be formed by letters in the board, i repeat A L L  T H E  W O R D S. The word can start from any position in the board and can move in any of the four directions (up, down, left, right). The dictionary is given as a list of words.

This is a sequel to [Word Search I](https://leetcode.com/problems/word-search/), which is a slightly easier problem. In that problem, we only need to find one word in the board. In this problem, we need to find all the words in the board. This is a much harder problem.
# Solution
## Trick
Word search I uses backtracking/recursion over the whole board to find the one word. That problems time complexity is about $O(m*n*4^k)$, where $m$ and $n$ are the dimensions of the board and $k$ is the length of the word. This problem is much harder because we need to find all the words in the board. If we use the same backtracking/recursion approach, the time complexity will be $O(m*n*4^k*w)$, where $w$ is the number of words in the dictionary. This is too slow.  

So we use trie data structure to organise our dictionary/words to search. This will reduce the time complexity to $O(m*n*4^k)$, which is the same as word search I. Trie helps us simultaneously search a lot of words with same prefix. This is the key to solving this problem.

Note- I have spent hours (7 to be exact) trying to do this problem and it did not work. I am just going to copy paste from neetcode.
## Code
```cpp
class TrieNode {
public:
    TrieNode* children[26];
    bool isWord;
    
    TrieNode() {
        for (int i = 0; i < 26; i++) {
            children[i] = NULL;
        }
        isWord = false;
    }
};

class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        for (int i = 0; i < words.size(); i++) {
            insert(words[i]);
        }
        
        int m = board.size();
        int n = board[0].size();
        
        TrieNode* node = root;
        vector<string> result;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                search(board, i, j, m, n, node, "", result);
            }
        }
        
        return result;
    }
private:
    TrieNode* root = new TrieNode();
    
    void insert(string word) {
        TrieNode* node = root;
        int curr = 0;
        
        for (int i = 0; i < word.size(); i++) {
            curr = word[i] - 'a';
            if (node->children[curr] == NULL) {
                node->children[curr] = new TrieNode();
            }
            node = node->children[curr];
        }
        
        node->isWord = true;
    }
    
    void search(vector<vector<char>>& board, int i, int j, int m, int n, TrieNode* node, string word, vector<string>& result) {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] == '#') {
            return;
        }
        
        char c = board[i][j];
        
        node = node->children[c - 'a'];
        if (node == NULL) {
            return;
        }
        
        word += board[i][j];
        if (node->isWord) {
            result.push_back(word);
            node->isWord = false;
        }
        
        board[i][j] = '#';
        
        search(board, i - 1, j, m, n, node, word, result);
        search(board, i + 1, j, m, n, node, word, result);
        search(board, i, j - 1, m, n, node, word, result);
        search(board, i, j + 1, m, n, node, word, result);
        
        board[i][j] = c;
    }
};
```

## Time Complexity: $O(4m*3^{l-1})$
where,  
m = nummber of cells or rows * columns  
l = max length of words

The time complexity can also be written as or $O(m*4^l)$. We have a 4 in the time complexity because we are searching in 4 directions. The $3^{l-1}$ comes from the fact that we are not searching in the direction we came from. So we have 3 choices for the next letter. This is a very important observation.

Space: $O(n)$ -> n = total number of letters in dictionary (no overlap in Trie)