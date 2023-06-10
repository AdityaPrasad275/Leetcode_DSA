# [Question](https://leetcode.com/problems/lru-cache/)
Difficulty: Medium
# Goal
Implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put. 
# Solution
## Trick
The trick is to use a doubly linked list and a hashmap. The doubly linked list will store the key and value of the cache. The hashmap will store the key and the pointer to the node in the doubly linked list. the get function has two things. first, find the key value pair and second, make this particular node the most used node.
The put is even more complicated. first, check if the key is already present in the cache. if it is, then update the value and make this node the most used node. if it is not present, then check if the cache is full. if it is full, then delete the least used node and add this node to the front of the doubly linked list. if it is not full, then simply add this node to the front of the doubly linked list. (by front i mean make it most used node)
## Code
// this is the code copilot generated, my code doesn't use in built list so is way more hideous. 
```
class LRUCache {
    int capacity;
    list<pair<int, int>> l;
    unordered_map<int, list<pair<int, int>>::iterator> m;
public:
    LRUCache(int capacity) {
        this->capacity = capacity;
    }
    
    int get(int key) {
        if(m.find(key) == m.end()) return -1;
        l.splice(l.begin(), l, m[key]);
        return m[key]->second;
    }
    
    void put(int key, int value) {
        if(m.find(key) != m.end()){
            l.splice(l.begin(), l, m[key]);
            m[key]->second = value;
            return;
        }
        if(l.size() == capacity){
            int keyToDel = l.back().first;
            l.pop_back();
            m.erase(keyToDel);
        }
        l.push_front({key, value});
        m[key] = l.begin();
    }
};
```
<details>
<summary> My hideous code (way too long)</summary>

```
class LRUCache {
public:
    LRUCache(int capacity) {
        this->capacity = capacity;
        //leastUsed is on right side while most used is on left side
        leastUsed->prev = mostUsed;
        mostUsed->next = leastUsed;
    }
    
    int get(int key) {
        if(hashMap.find(key) != hashMap.end()){
            dllistNode *temp = hashMap[key];

            //removing temp from where it is
            temp->prev->next = temp->next;
            temp->next->prev = temp->prev;
            
            //adding temp to the front of mostUsed.
            mostUsed->next->prev = temp;
            temp->next = mostUsed->next;
            temp->prev = mostUsed;
            mostUsed->next = temp;
            return hashMap[key]->value;
        }
        else
            return -1;
    }
    
    void put(int key, int value) {
        if(hashMap.find(key) != hashMap.end()){
            hashMap[key]->value = value;
            dllistNode *temp = hashMap[key];

            //removing temp from where it is
            temp->prev->next = temp->next;
            temp->next->prev = temp->prev;

            //adding temp to the front of mostUsed.
            mostUsed->next->prev = temp;
            temp->next = mostUsed->next;
            temp->prev = mostUsed;
            mostUsed->next = temp;
        }else if(hashMap.size() == capacity){
            dllistNode *newNode = new dllistNode(key, value, nullptr, nullptr);
            hashMap[key] = newNode;

            //adding new node to front of mostUsed.
            mostUsed->next->prev = newNode;
            newNode->next = mostUsed->next;
            newNode->prev = mostUsed;
            mostUsed->next = newNode;

            hashMap.erase(leastUsed->prev->key);//removing least used node.

            dllistNode *temp = leastUsed->prev;
            leastUsed->prev = temp->prev;
            leastUsed->prev->next = leastUsed;
            delete temp;
        }
        else{
            dllistNode *temp = new dllistNode(key, value, mostUsed->next, mostUsed);
            mostUsed->next->prev = temp;
            mostUsed->next = temp;
            hashMap[key] = temp;
        }
    }
private:
    struct dllistNode{
        int value, key;
        dllistNode *next;
        dllistNode *prev;
        dllistNode(int _key, int _value, dllistNode *_next, dllistNode *_prev){
            this->key = _key;
            this->value = _value;
            this->next = _next;
            this->prev = _prev;
        }
    };

    dllistNode *leastUsed = new dllistNode(0, 0, nullptr, nullptr);
    dllistNode* mostUsed = new dllistNode(0, 0, nullptr, nullptr);
    int capacity;
    unordered_map<int, dllistNode *> hashMap;
};
```

</details>

## Time Complexity: $O(1)$
time complexity of get and put is $O(1)$ due to llist and hashmap. Space compexity is $O(capacity)$

comment - Use inbuilt list and hashmap, it will make your life easier. And also, faster. 