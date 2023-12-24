# [Question](https://leetcode.com/problems/reverse-linked-list/)
Difficulty: Easy

# Goal 
Reverse a linked list. Given [1 -> 2 -> 3], output [3 -> 2 -> 1]

# Solution
## trick
1. $O(n)$ space soln - 
Just create a new linked list, straightforward, simple.
Have two pointers, one (head) traversing given linked list and other (end) traversing your new forming Linked list.
Create a new node (temp) using head pointer, make it point to end. Then do head = head->next and end = temp. (Shifting head ahead, bring end back)
2. $O(1)$ space soln - Use three node ptrs - temp1, temp2, temp3.These start as nullptr, head, head->next. Link temp1 and temp2 and then shift all three ahead. Do this till temp3 is nullptr. Link temp1 and temp2 for last time, and return temp2. (temp2 is the new head of reversed llist)
## code
1st - 
```cpp
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
2nd - 
```cpp
ListNode* reverseList(ListNode* head) {
    if(!head) return nullptr;

    ListNode* temp1 = nullptr;
    ListNode* temp2 = head;
    ListNode* temp3 = head->next;

    while(temp3){
        temp2->next = temp1;
        temp1 = temp2;
        temp2 = temp3;
        temp3 = temp3->next;
    }
    temp2->next = temp1;
    return temp2;
}
```
## Time Complexity: $O(n)$ 
Space complexity for 1st is $O(n)$ (because we create new nodes) and for 2nd is $O(1)$ (because we are just modifying the next pointers of existing nodes)