# [Question](https://leetcode.com/problems/reverse-linked-list/)
Difficulty: Easy

# Goal 
Reverse a linked list. Given [1 -> 2 -> 3], output [3 -> 2 -> 1]

# Solution
## trick
Just create a new linked list, straightforward, simple.
Have two pointers, one (head) traversing given linked list and other (end) traversing your new forming Linked list.
Create a new node (temp) using head pointer, make it point to end. Then do head = head->next and end = temp. (Shifting head ahead, bring end back)
## code
```
ListNode* reverseList(ListNode* head) {
    ListNode* end = nullptr;
    while(head != nullptr){
        ListNode* temp = new ListNode(head->val, end);
        end = temp;
        head = head->next;
    }
    return end;
}
```
## Time Complexity: $O(n)$ 
Space complexity is $O(n)$ too because we are making entirely new nodes. It can be made into $O(1)$ but involves some confusing pointer flipping.