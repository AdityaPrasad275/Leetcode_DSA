# [Question](https://leetcode.com/problems/design-add-and-search-words-data-structure/)
Difficulty: Medium (it's hell)
# Goal
Implement the `WordDictionary` class that can add words and search it. What makes this hard? When searching, you can do something like "b.b" and if there exits a "bob" or a "bab" or a "bub" then it should return true. the "." can be any character/wildcard. so if you have a million words in your dictionary,and you search something like "................c" then FIND EVERY WORD THAT HAS A "C" AT THE GIVEN POSITION (well not find, but return true if it exists) OR BURN IN HELL WITH YOUR WRETCHED CODE.  

# Solution
## Trick
Use trie. Addword is standard trie implementation.
Search is the real hell. For every '.' you encounter, you have to search every child of the current node. It uses recursion for this. Not as complicated as i making it out to be tbh.
## Code
```cpp
class WordDictionary {
private:
    struct Node{
        array<Node*, 26> nextNodes;
        bool isEnd;
        Node(){
            nextNodes.fill(nullptr);
            isEnd = false;
        }
    };
    Node* rootNode;

public:
    WordDictionary() {
        rootNode = new Node();
    }
    virtual ~WordDictionary(){
        delete rootNode;
    }
    
    void addWord(string word) 
    {
        Node *dummy = rootNode;
        for(auto c: word)
        {
            Node *&temp = dummy->nextNodes.at((int)(c - 'a'));
            if(temp==nullptr)
                temp = new Node();

            dummy = temp;
        }
        dummy->isEnd = true;
    }
    
    bool search(string word) 
    {
        int index = 0;
        return helper(index, word, rootNode);
    }
    
    bool helper(int &index, string &word, Node *root)
    {
        if(!root)
            return false;

        Node *current = root;
        for (int i = index; i < word.size(); i++)
        {
            if(word[i]=='.')
            {
                for(auto childNode: current->nextNodes)
                {
                    int pass = i + 1;
                    if(helper(pass, word, childNode))
                        return true;
                }
                return false;
            }
            else{
                if (!current->nextNodes.at((int)(word[i] - 'a')))
                    return false;
            }
            current = current->nextNodes.at((int)(word[i] - 'a'));  
        }
        return current->isEnd;
    }
};
```
## Time Complexity: 
$O(n)$ for addWord as it is standard search.
It should be linear in search too..... i think..... i hope.....