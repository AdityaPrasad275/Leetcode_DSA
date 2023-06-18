# [Question](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
Difficulty: Medium (honestly, easy)
# Goal
given a llist, remove the nth node from the end of the llist and return the head of the llist.  
eg. 1->2->3->4->5, n = 2, return 1->2->3->5
# Solution
## Trick
Brute force - find length of llist, then traverse again to find the node to be deleted.  
Smart method - use two pointers, one fast and one slow. Move the fast pointer n steps ahead of slow pointer. Then, move both pointers together till fast pointer reaches end of llist. Now, slow pointer is at the node to be deleted.  
Comment - The brute force defeats the smart method💀
<img alt="runtime beats 100%" src="images/image.png">
## Code
Brute force -

```cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    int size = 0;
    ListNode* dummy = head;
    while(dummy != nullptr){
        size++;
        dummy = dummy->next;
    }
    int index = size - n;

    if(size == 1) return nullptr;
    if(index == 0) return head->next;

    int i = 1;
    dummy = head;
    while(i < index){
        i++;
        dummy = dummy->next;
    }

    dummy->next = dummy->next->next;
    return head;
}
```

Smort method -
```cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode* slow= head, *fast=head;
    while(n--){
        fast = fast->next;
    }
    if(fast == NULL) return slow=slow->next;
    while(fast->next != NULL){
        slow = slow->next;
        fast=fast->next;
        
    }
    slow->next = slow->next->next;
    return head;
}
```
## Time Complexity: $O(n)$
The brute force ofcourse finds the total size of llist in $O(n)$ time and then traverses again to find the node to be deleted. The smart method does it in one pass, so $O(n)$ time.