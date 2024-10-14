# [Question](https://leetcode.com/problems/coin-change/)
Difficulty: Medium
# Goal
Given an amount and a list of coins, find the minimum number of coins required to make up the amount. You can use any number of coins of each type.
# Solution
## Trick
I stupidly jump to greedy algos and they don't work. Tried using the logic - "take max amount of big coins, then go small and so on". But that doesn't work lol.

Instead here's the recursion relation - 

count(a) = min( count(a - c1), count(a - c2), ... ) + 1

where count(a) is the minimum number of coins required to make up amount a and c1, c2, ... are the coins available.

Then to turn to DP, we make count(a) into an array of size amount + 1 with the following initial conditions -

``` 
count[0] = 0;
```

and then we fill the array from the front using the above recursion relation. The answer is count[amount].

## Code
```cpp
int coinChange(vector<int>& coins, int amount) 
{
    vector<long long int> value(amount+1, INT_MAX);
    value[0] = 0;
    for (int x = 1; x <= amount; x++) 
    {
        for (auto c : coins) 
        {
            if (x-c >= 0)
                value[x] = min(value[x], value[x-c]+1); 
        }
    }
    return value[amount] == INT_MAX ? -1 : value[amount];
}
```
## Time Complexity: $O(n)$