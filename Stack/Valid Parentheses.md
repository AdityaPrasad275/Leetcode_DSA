# [Question](https://leetcode.com/problems/valid-parentheses/)
Difficulty: Easy
# Goal
Check if every parantheses has it's partner or not. Standard stack problem
# Solution
## Trick
Maintain a stack where the top() stores the latest open parentheses. Go through given string, check each character if it pairs with top(). if it does, pop(), doesn't, insert().In the end, there should be no leftover chars in stack for it to be valid.
## Code
```
bool isValid(string s) {
    if (s.size() % 2 == 1) return false;
    stack<char> st;
    for (auto x : s) {
        if (x == '(' || x == '{' || x == '[') st.push(x);
        else if(st.empty()) return false;
        else {
            if (x == ')' && st.top() == '(') st.pop();
            else if (x == '}' && st.top() == '{') st.pop();
            else if (x == ']' && st.top() == '[') st.pop();
            else break;
        }
    }
    if (st.empty()) return true;
    else return false;
}
```
## Time complexity: $O(n)$
