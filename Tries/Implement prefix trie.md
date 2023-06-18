# [Question](https://leetcode.com/problems/implement-trie-prefix-tree/)
Difficulty: Medium (bit hard)
# Goal
Implement a trie with insert, search, and startsWith(checks prefix) methods.
# Solution
## Trick
insert and search methods can be dealt with by simply using a hasmap of strings, does not require a trie. The startsWith method is the one that requires a trie. (Not really, with a bit of cheating, you can use a hashmap for this too, but that is not the point of this question)

For the trie, create a Node struct with a hashmap of pointers to next nodes. The key of the hashmap is the character that the node represents, and the value is the pointer to the node that represents the next character in the string. For end of word, we can use a boolean variable. This will be useful in the search method.

There's also another way and that uses a array(of size 26) of pointers to next nodes. This is a bit more efficient than the hashmap method, but the hashmap method is easier to implement.
## Code
array of pointers method
```cpp
class Trie
{
public:
    Trie()
    {
        rootNode = new Node();
    }

    virtual ~Trie()
    {
        delete rootNode;
    }

    void insert(string word)
    {
        Node *dummy = rootNode;
        for (char c : word)
        {
            Node *&temp = dummy->nextNodes.at((int)(c - 'a'));
            if (temp == nullptr)
                temp = new Node();

            dummy = temp;
        }
        dummy->isEndOfWord = true;
    }

    bool search(string word)
    {
        Node *dummy = rootNode;
        for (char c : word)
        {
            Node *&temp = dummy->nextNodes.at((int)(c - 'a'));
            if (temp == nullptr)
                return false;
            dummy = temp;
        }

        if(!dummy->isEndOfWord)
            return false;

        return true;
    }

    bool startsWith(string prefix)
    {
        Node *dummy = rootNode;
        for (char c : prefix)
        {
            Node *temp = dummy->nextNodes.at((int)(c - 'a'));
            if (temp == nullptr)
                return false;

            dummy = temp;
        }
        return true;
    }
    struct Node
    {
        array<Node *, 26> nextNodes;
        bool isEndOfWord;
        Node()
        {
            nextNodes.fill(nullptr);
            isEndOfWord = false;
        }
    };
    Node *rootNode;

};
```
hashmap method
```cpp
class Trie {
public:
    Trie()
    {
        rootNode = new Node();
    }
    
    void insert(string word) 
    {
        Node *dummy = rootNode;

        for(auto c : word)
        {
            if(dummy->nextNodes.find(c) == dummy->nextNodes.end())
                dummy->nextNodes[c] = new Node();

            dummy = dummy->nextNodes[c];
        }
        dummy->isEnd = true;
    }
    
    bool search(string word) 
    {
        Node *dummy = rootNode;

        for(auto c : word)
        {
            if(dummy->nextNodes.find(c) == dummy->nextNodes.end())
                return false;

            dummy = dummy->nextNodes[c];
        }
        if(dummy->isEnd)
            return true;

        return false;
    }
    
    bool startsWith(string prefix) 
    {
        Node *dummy = rootNode;

        for(auto c : prefix)
        {
            if(dummy->nextNodes.find(c) == dummy->nextNodes.end())
                return false;

            dummy = dummy->nextNodes[c];
        }
        return true;
    }
private:
    struct Node
    {
        unordered_map<char, Node *> nextNodes;
        bool isEnd;
        Node() : isEnd(false) {};
    };

    Node *rootNode;
};
```
## Time Complexity: $O(n)$
$O(n)$ for all methods, where n is the length of the string