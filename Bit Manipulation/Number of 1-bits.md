# [Question](https://leetcode.com/problems/number-of-1-bits/)
Difficulty: Easy 
# Goal
Count the number of 1 bits in an unsigned integer.
# Solution
## Trick
A simple way to do this is to keep shifting the number to the right and check if the last bit is 1. If it is, increment the count.
Basically
```python
while n > 0:
    count += n % 2 (or count += n & 1) # check if last bit is 1
    n = n / 2 (or n = n >> 1)  # right shift by 1 bit
```

This will take $O(32)$ time because we are slowly shifting bit one by one and checking the last bit. We can do better by using a trick.

Trick: `n & (n-1)` will remove the rightmost 1 from n. So if we keep doing this until n becomes 0, we will have removed all the 1 bits from n.This will take $O(k)$ time where k is the number of 1 bits in n. Which again in worstcase is $O(32)$. 
## Code
Simple solution:
```cpp
int hammingWeight(uint32_t n) 
{
    int count = 0;
    while(n > 0)
    {
        count += n % 2;
        n = n /2;
    }
    return count;
}
```
Tricky solution:
```cpp
int hammingWeight(uint32_t x) 
{
    int count = 0;
    while(x != 0)
    {
        x = x & (x-1);
        count++;
    }
    return count;
}
```
## Time Complexity: Worst case $O(32)$
$O(k)$ where k is the number of 1 bits in n. 
## Space Complexity: $O(1)$
