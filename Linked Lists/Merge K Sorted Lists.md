# [Question](https://leetcode.com/problems/merge-k-sorted-lists/)
Difficulty: Hard (easy tbh, just extension of merge two sorted lists)
# Goal
Given k sorted linked lists, merge them into one sorted linked list.
# Solution
## Trick
A simple merge sort. Make groups of two, merge these, make groups of two in them, merge them and on and on $logk$ times. There is a smort easy way to do using priority heap but I don't know that yet so won't implement it.
My first solution was $O(n\cdot k)$ which did pass but only beat 5% lol. That i did using psuedocode and chatgpt, which made the code clean af. It's like an extension of merge two lists but a bad direction extension? ... it looks at all the k pointers in lists vector and does ptr = ptr->next for the one with min vale. It handled edge case brilliantly so i like it. But it's slow.
## Code
Merge sort - 
```cpp
ListNode* mergeKLists(std::vector<ListNode*>& lists) {
    if(lists.size()==0)
        return nullptr;

    std::vector<ListNode *> newLists;

    while(lists.size() > 1){
        for (int i = 0; i < lists.size(); i+=2){
            ListNode *l1 = lists[i];
            ListNode *l2 = (i + 1 < lists.size()) ? lists[i + 1] : nullptr;

            newLists.push_back(mergeTwoLists(l1, l2));
        }
        lists = newLists;
        newLists.clear();
    }
    return lists[0];
}
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2){
    ListNode *dummy = new ListNode();
    ListNode *temp = dummy;

    while(l1 != nullptr && l2 != nullptr){
        if(l1->val < l2->val){
            dummy->next = l1;
            l1 = l1->next;
        }
        else{
            dummy->next = l2;
            l2 = l2->next;
        }
        dummy = dummy->next;
    }
    if(l1 == nullptr)
        dummy->next = l2;
    else
        dummy->next = l1;

    return temp->next;
}
```
my first solution - 
```cpp
ListNode* mergeKLists(std::vector<ListNode*>& lists) {
    ListNode *dummy = new ListNode();
    ListNode* head = dummy;

    while (true) {
        int min = std::numeric_limits<int>::max();
        int index = -1;

        for (int i = 0; i < lists.size(); i++) {
            if (lists[i] != nullptr && lists[i]->val < min) {
                min = lists[i]->val;
                index = i;
            }
        }

        if (index == -1) {
            break;
        }

        ListNode* temp = new ListNode(min);
        dummy->next = temp;
        dummy = temp;
        lists[index] = lists[index]->next;
    }

    return head->next;
}
```
## Time Complexity: $O(n\cdot  logk)$
where k is the number of linked lists and n is the total number of nodes in two lists. Space complexity is $O(n)$. It takes lists, halves it and stores it in another vector. 
My solution is $O(n\cdot k)$ time and $O(1)$ space. 