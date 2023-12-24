# [Question](https://leetcode.com/problems/add-two-numbers)
Difficulty: Medium 
# Goal
Numbers given in llist, reversed order so that first place is at head and second place is next and so on. Add the two numbers and return the sum in llist form.    
ex.2->4->3  
\+   5->6->4  
 = 7->0->8
# Solution
## Trick
Keeping mind of carry over is important.
Normally we add right to left but here visualize it left to right.
Each iteration of while loop, make a node whose value = (num1 + num2 + carry)%10.  
carry = (num1 + num2 + carry)/10.
Keep in mind , if one llist is longer than other, then the remaining digits of longer llist are added to the sum as well. And when while loop has ended, last carry needs to be considered.
## Code
```cpp
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    int carry = 0;
    ListNode* dummy = new ListNode;
    ListNode* head = dummy;
    while(l1 != nullptr || l2 != nullptr){
        int num1 = (l1 == nullptr) ? 0 : l1->val;
        int num2 = (l2 == nullptr) ? 0 : l2->val;
            
        ListNode* temp = new ListNode((num1 + num2 + carry) % 10);
        
        carry = (num1 + num2 + carry)/10;

        dummy->next = temp;
        dummy = dummy->next;
        l1 = (l1 == nullptr) ? nullptr : l1->next;
        l2 = (l2 == nullptr) ? nullptr : l2->next;;
    }
    if(carry){
        ListNode *temp = new ListNode(carry);
        dummy->next = temp;
    }
    return head->next;
}
```
## Time Complexity: $O(n)$
Where n is max length of l1 and l2. Space complexity is $O(n)$ as well.