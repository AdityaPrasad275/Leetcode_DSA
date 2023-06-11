# [Question](https://leetcode.com/problems/linked-list-cycle)
Difficulty: Easy
# Goal
Find a loop in llist.
# Solution
## Trick
Three methods (2 legit,1 cheat)  
1. tortoise heir method - 1 slow pointer and 1 fast pointer. Slow pointer moves one step at a time while fast pointer moves two steps at a time. If there is a loop slow === fast at some point $\leq O(n)$.
2. Shove each node into hashmap. Once you get a repeated node, done!
3. Given max number of nodes = $10^4$ , just run a while loop $10^4 + 1$ times lol. either you'll encounter a nullptr , so no loop, or you'll overshoot max number of nodes, so yes loop!
## Code
tortoise - heir method -
```cpp
bool hasCycle(ListNode *head) {
    ListNode *fast = head, *slow = head;

    while(fast != nullptr && fast->next != nullptr && fast->next->next != nullptr){
        slow = slow->next;
        fast = fast->next->next;
        if(slow == fast) return true;
    }
    return false;
}
```
cheat method - 
```cpp
bool hasCycle(ListNode *head) {
    int maxNodes = 10101;
    if(head == nullptr) return false;
    while(head->next != nullptr && maxNodes--)
        head = head->next;
    
    if(head->next == nullptr) return false;
    else return true;
}
```
## Time Complexity: $O(n)$
The tortoise heir one is at max $O(n)$ while cheat method is $O(max(n))$. Funny how cheat method gives faster(7 ms, 96%) runtime in leetcode than former non cheat method(15 ms, 31%).Space complexity for both is $O(1)$ while for the hashmap one it is $O(n)$