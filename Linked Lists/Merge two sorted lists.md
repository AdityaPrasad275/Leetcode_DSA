# [Question](https://leetcode.com/problems/merge-two-sorted-lists/)
Difficulty: Easy

# Goal 
Given two sorted LLists (Linked lists), merge them into one sorted llist.

# Solution
## trick
Have two pointers, l1 and l2 traversing the two llists. Compare l1->value and l2->value to see which one to move ahead and which value to store in our llist. Creating a dummy node really helps simplify. If one llists exhausts, simply append the other to it.
## code
```cpp
ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode *dummy, *temp;
    dummy = new ListNode();
    temp = dummy;
    
    //when both list1 and list2 isn't empty
    while(list1 && list2){
        if(list1->val < list2->val){
            temp->next = list1;
            list1 = list1->next;
        }
        else{
            temp->next = list2;
            list2 = list2->next;   
        }
        temp = temp->next;
    }
    
    // we reached at the end of one of the list
    if(list1) temp->next = list1;
    if(list2) temp->next = list2;
    
    return dummy->next;
}
```
## Time Complexity: $O(n)$
Where $n$ is $min(n_1, n_2)$, 
$n_1$ is length of llist 1 and $n_2$ is length of llist 2. Space complexity is $O(1)$ as we are not creating any new nodes, just modifying the next pointers of existing nodes.