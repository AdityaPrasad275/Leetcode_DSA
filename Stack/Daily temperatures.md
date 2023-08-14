# [Question](https://leetcode.com/problems/daily-temperatures/)
Difficulty: Medium
# Goal
for an $a[i]$ find the minimum index $j$ for which $a[j]$ > $a[i]$. (this is exactly reverse of stock price problem of cs213)
# Solution
## trick
Use stack. Traverse array from n - 2 (second last index) to 0. From every $a[i]$, compare it to element on top of stack. If $a[i]$ > stack.top(), do stack.pop().  
2 details. Stack stores indices. After every for loop, stack.insert(i) (add latest index)

This is also discussed [here](./great%20stack%20resource.md#Questions)
## code
```cpp
vector<int> dailyTemperatures(vector<int>& temp) 
{
    int n = temp.size();
    stack<int> index;
    vector<int> ans(n, 0);

    index.push(n - 1);
    ans[n - 1] = 0;

    for (int i = n - 2; i > -1; i--) 
    {
        while (!index.empty()) 
        {
            if (temp[index.top()] <= temp[i]) index.pop();
            else break;
        }
        if (index.empty()) ans[i] = 0;
        else ans[i] = index.top() - i;

        index.push(i);
    }
    return ans;

}
```
# Time Complexity: $O(n)$
