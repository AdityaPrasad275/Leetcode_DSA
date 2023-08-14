# [Question](https://leetcode.com/problems/generate-parentheses/)
Difficulty: Medium
# Goal
Generate all valid parentheses combinations for a given n (n is number of pairs)
# Solution
## Trick
1) Use recursion  
2) Realise that closed parenthesis ( ')' ) can only be "added in output string" when numOpen > numClosed. Output string is one particular combination of parenthesis we are constructing one parenthesis at a time  
3) str.pop_back() is ***very*** important after every recursive call.  
comment: this particular question is order sensitive so only particular implementation passes, so give importance to order of if statements in recursion.
## Code
### cpp
```cpp
class Solution {
public:
    vector<string> generateParenthes(int n)
    {
        string str;
        vector<string> vecOfStrs;
        generateParenthes(n, 0, 0, str, vecOfStrs);
        return vecOfStrs;
    }
    void generateParenthes(int n, int numOpen, int numClose, string &str, vector<string> &vecOfStrs)
    {
        if (numOpen == n && numClose == n)
        {
            vecOfStrs.push_back(str);
            return;
        }
        if (numOpen < n)
        {
            str = str + "(";
            generateParenthes(n, numOpen+1, numClose, str, vecOfStrs);
            str.pop_back();
        }
        if (numClose < numOpen)
        {
            str = str+ ")";
            generateParenthes(n, numOpen, numClose+1, str, vecOfStrs);
            str.pop_back();
        }
    }
};
```
### python
```python
def genrateParantheses(self, n: int) -> List[str]:
    stack = []
    result = []
    
    def backtracking(openN, closedN):
        if openN == closedN == n:
            result.append("".join(stack))
            return
        if openN < n:
            stack.append("(")
            backtracking(openN + 1, closedN)
            stack.pop()
        if closedN < openN:
            stack.append(")")
            backtracking(openN, closedN + 1)
            stack.pop()
            
    backtracking(0, 0)
    
    return result
```
comment: python is sooooooo much simpler oh my lawd. easier code to make and most importantly, *easier to compile*
## Time coplexity : $O(4^n/\sqrt{n})$ 
4th [catalan number](https://en.wikipedia.org/wiki/Catalan_number#:~:text=In%20combinatorial%20mathematics%2C%20the%20Catalan,Belgian%20mathematician%20Eug%C3%A8ne%20Charles%20Catalan.)
