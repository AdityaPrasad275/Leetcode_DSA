# [Question](https://leetcode.com/problems/reorder-list/)
Difficulty: Medium
# Goal
Given a list 1 -> 2 -> 3 -> 4 , reoder this into 1 -> 4 -> 2 -> 3. A sort of first, last, first, last back and forth.
# Solution
## Trick
Three ways - 2 of which take O(n) space and 1 of which is constant space.
1. Store the llist in a vector. Then link the first half i's to (n-1-i)th one and the second hald i's to (n-i)th one.
2. Use stacks! insert back half of the llist into stack (the last element of llist is on top). Now you can 'sew' the llist together by popping from stack and inserting into llist.
3. For constant space one, quite a few steps involved. First, find the middle of the llist. Then, reverse the second half of the llist. Then, merge the two llists.
## Code
1st one ->

```cpp
void reorderList(ListNode *head)
{
    ListNode *dummy = head;
    if (dummy == nullptr)
        return;

    std::vector<ListNode *> llist;

    while (dummy->next != nullptr)
    {
        llist.push_back(dummy);
        dummy = dummy->next;
    }
    llist.push_back(dummy);
    int n = llist.size();
    for(int i = 0; i< n / 2; i++)
        llist[i]->next = llist[n-1-i];

    llist[n/2]->next = nullptr;

    for(int i = n/2 +1; i<n;i++)
        llist[i]->next = llist[n-i];

    head = llist[0];
}
```
2nd one ->
```cpp
void reorderList(ListNode* head) {
    if(head==NULL || head->next==NULL || head->next->next==NULL){
        return;
    }
    stack<ListNode*>st;
    ListNode* t = head;
    int n = 0;
    while(t!=NULL){
        st.push(t);
        n++;
        t = t->next;
    }
    t = head;
    for(int i=0;i<n/2;i++){
        ListNode* node = st.top();
        st.pop();
        node->next = t->next;
        t->next = node;
        t = t->next->next;
    }
    t->next = NULL;
}
```
3rd one ->
```cpp
void reorderList(ListNode *head)
{
    if(head->next == nullptr || head->next->next == nullptr) return;
    //finding the middle
    ListNode *slow = head, *fast = head->next;
    while(fast != nullptr && fast->next != nullptr){
        slow = slow->next;
        fast = fast->next->next;
    }

    //reversal of second half of the list
    ListNode *temp1 = nullptr, *temp2 = slow->next, *temp3 = slow->next->next;
    slow->next = nullptr;//ending the first half of list
    while(temp3 != nullptr){
        temp2->next = temp1;
        temp1 = temp2;
        temp2 = temp3;
        temp3 = temp3->next;
    }
    temp2->next = temp1;

    //stitching the lists together
    ListNode* secondHead = temp2;
    ListNode *ptr1 = head, *ptr2 = head->next;
    while(ptr2 != nullptr){
        ptr1->next = secondHead;
        ListNode* temp = secondHead->next;
        secondHead->next = ptr2;
        ptr1 = ptr2;
        ptr2 = ptr2->next;
        secondHead = temp;
    }
    ptr1->next = secondHead;
    if(secondHead != nullptr) secondHead->next = ptr2;
}
```
## Time Complexity: $O(n)$
Some have $2n$ or $n/2$ time complexity but they all are linear. removing space complexity is a bit tricky. Have to do all pointer manipulation which is hard to keep track or visualize (but break it down into steps and becomes bit easy). Space complexity is $O(1)$ for the 3rd one and $O(n)$ for the first two.