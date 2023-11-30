# [Question](https://leetcode.com/problems/counting-bits/)
Difficulty: Easy ($O(nlogn)$ solution is easy, build on top of number of 1 bits problem, $O(n)$ solution is tricky)
# Goal
Given n, return an array of size n+1 where each element is the number of 1 bits in the binary representation of the index of the array.

`ans[i] = number of 1 bits in i` for i in `[0, n]`
# Solution
## Trick
The $O(n\cdot logn)$ solution builds on top of number of 1 bits problem. Simple iterate from 0 to n (inclusive) and call the number of 1 bits function on each number. This will take $O(nlogn)$ time.

For $O(n)$ solution one needs a recursive formula. The formula is: `ans[i] = ans[i >> 1] + i%2`. This is because the number of 1 bits in a number is equal to the number of 1 bits in the number rightshifted by 1 plus the last bit of the number.

Beautiful DP!
## Code
1. Simple $O(n\cdot logn)$ solution:

```cpp
class Solution {
public:
    vector<int> countBits(int n) 
    {
      vector<int> ans(n+1, 0);

      for(int i = 0; i <= n; i++)
        ans[i] = helper(i);

      return ans;
    }
    int helper(int n)
    {
      int count = 0;

      while(n > 0)
      {
        n = n & (n-1);
        count++;
      }
      return count;
    }
};
```

2. $O(n)$ solution:  
2.1 My solution:
```cpp
vector<int> countBits(int n) 
{
    int offset = 1;
    vector<int> ans(n+1, 0);

    for(int i = 1; i < n+1; i++)
    {
        if(offset * 2 == i)
            offset = offset * 2;

        ans[i] = 1 + ans[i - offset];
    }
    return ans;  
}
```
For this solution consider the table
| i | i in binary | ans[i] | 
|---|-------------|--------|
| 0 | 0000        | 0      |
| 1 | 0001        | 1      |
| 2 | 0010        | 1      |
| 3 | 0011        | 2      |
| 4 | 0100        | 1      |
| 5 | 0101        | 2      |
| 6 | 0110        | 2      |
| 7 | 0111        | 3      |
| 8 | 1000        | 1      |

Notice how the binary representation of 2 and 3 is dupicate of 0 and 1 with extra leftmost 1 bit. Same can be said for numbers 4 to 7 being duplicates of 0 to 3 with extra leftmost 1 bit. Thus `dp[n] = 1 + dp[n - 2^k]` where `2^k` is the largest power of 2 less than n. This is what the code does.

2.2 Better more beautiful solution:
```cpp
vector<int> countBits(int n) 
{
    vector<int> ans(n+1, 0);

    for(int i = 0; i <= n; i++)
        ans[i] = ans[i >> 1] + i % 2;
        
    return ans;
}
```

## Time Complexity: Tricky - $O(n)$, Simple - $O(n\cdot logn)$