# [Question](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
Difficulty: Easy
# Goal
Find max profit that can be gained given an array of prices.
# Solution
## Trick
Remember, time only goes in one direction. So can't just do max_element - min_element. Instead, run a for loop and in it, iteratively update minPrice and maxProfit. This ensures that your buy is before sell.
## Code
```
int maxProfit(std::vector<int>& prices) {
    int minPrice = INT_MAX, profit = 0;
    for(int i = 0; i < prices.size(); i++){
        minPrice = min(minPrice, prices[i]);
        profit = max(profit, prices[i] - minPrice);
    }
    return profit;
}
```
## Time Complexity: $O(n)$
Space complexity is $O(1)$