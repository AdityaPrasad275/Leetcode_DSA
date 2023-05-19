# Difficulty: Medium
# Goal
Evaluate expression in [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation).  
Basically, '3 4 + 5 * 3 -' => (3 + 4) * 5 - 3
# Solution
## trick
Use a stack. Insert nums. When operation is encountered, pop of two times, push the resultant of operation.  
`(int)(x[x.size() -1] - '0') >= 0` helps in differentiating between number and operation. The last char of string x is checked for num or not because first character can contain '-' for negative numbers
## code
```
#include<vector>
#include<string>
#include<stack>
#include<iostream>
class Solution {
public:
    int evalRPN(std::vector<std::string>& tokens) {
        std::stack<int> answer;
        for (auto x : tokens) {
            if ((int)(x[x.size() -1] - '0') >= 0) {
                answer.push(std::stoi(x));
            }
            else {
                int a = answer.top();
                answer.pop();
                int b = answer.top();
                answer.pop();
                switch (x[0])
                {
                case '+':
                    answer.push(a + b);
                    break;
                case '-':
                    answer.push(b - a);
                    break;
                case '*':
                    answer.push(a * b);
                    break;
                case '/':
                    answer.push(b / a);
                    break;
                default:
                    break;
                }
            }
        }
        return answer.top();
    }
};
```
## Time complexity: $O(n)$
Going through the loop once, the if for checking and switch for operation shouldn't change degree i think.
