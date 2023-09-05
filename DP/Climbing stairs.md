# [Question](https://leetcode.com/problems/climbing-stairs/)
Difficulty: Medium
# Goal
You can take 1 or 2 steps each time, how many ways to climb to the top
# Solution
## Trick
Simple fibonacci numbers. The number of ways to reach the top is the sum of the number of ways to reach the last step and the second last step. So we can use the same logic as fibonacci numbers to solve this.
## Code
// very elegant solution from leetcode, $O(n)$ time and $O(1)$ space
```cpp
int climbStairs(int n) 
{
    int a = 1, b = 1;

    for(int i = 1; i < n; i++)
    {
        a = a + b;
        b = a - b;
    }
    return a;
}
```
// my solution, $O(n)$ time and $O(n)$ space
```cpp
int climbStairs(int n) 
{
    vector<int> arr(n + 1, 1);
    
    for(int i = 2; i <= n; i++)
        arr[i] = arr[i-1] + arr[i - 2];

    return arr[n];   
}
```
## Time Complexity: $O(n)$
Just one pass through the array. Recurrence relation is $T(n) = T(n-1) + T(n-2)$ which is exponential. But we are using dynamic programming to store the values so we are not recalculating the same values again and again.
## Space Complexity: $O(n)$ for my solution, $O(1)$ for leetcode solution