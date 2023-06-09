# [Question](https://leetcode.com/problems/copy-list-with-random-pointer/)
Difficulty: Medium
# Goal
Given a llist, you have a create a new llist which is exact copy of given llist. The nodes in llist have a random and next pointer. You have to duplicate this in your own llist with new nodes. 
# Solution
## Trick
Two ways to do this. One is smort and other is simple and intuitive.

1. Use map! Map the old node to new node. This way you can directly find the node corresponding to oldNode->random. 
2. Duplicate the nodes and attach them directly next to their original nodes (thus doubling the llist). Now, the random pointer of the new nodes will be the next node of the old node's random pointer. Now, you can just separate the two llists.
<image src="deepcopy.png">
## Code
1. Using map
```
Node* copyRandomList(Node* head) {
    if(!head) return NULL;
    unordered_map<Node*, Node*> m;
    Node* temp = head;
    while(temp){
        m[temp] = new Node(temp->val);
        temp = temp->next;
    }
    temp = head;
    while(temp){
        m[temp]->next = m[temp->next];
        m[temp]->random = m[temp->random];
        temp = temp->next;
    }
    return m[head];
}
```
2. Without map
```
Node* copyRandomList(Node* head) {
    if(!head) return NULL;
    Node* temp = head;
    while(temp){
        Node* newNode = new Node(temp->val);
        newNode->next = temp->next;
        temp->next = newNode;
        temp = newNode->next;
    }
    temp = head;
    while(temp){
        temp->next->random = (temp->random) ? temp->random->next : NULL;
        temp = temp->next->next;
    }
    temp = head;
    Node* newHead = head->next;
    while(temp){
        Node* temp2 = temp->next;
        temp->next = temp2->next;
        temp2->next = (temp2->next) ? temp2->next->next : NULL;
        temp = temp->next;
    }
    return newHead;
}
```
## Time Complexity: $O(n)$
First one takes space $O(n)$ and second one takes space $O(1)$. Both take time $O(n)$. (technically, second one should take $O(n)$ space but eh)