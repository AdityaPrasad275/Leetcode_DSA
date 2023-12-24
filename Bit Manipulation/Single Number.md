# [Question](https://leetcode.com/problems/single-number/)
Difficulty: Easy (needs one bit manipulation trick)
# Goal
Given a non-empty array of integers, every element appears twice except for one. Find that single one.

constraints: linear time complexity, no extra space (so no hashmaps)
# Solution
## Trick
The trick is: If we xor all the numbers, the result will be the single number.   

### Why?   
Consider just the last bit of all numbers except the single number (so consider all the duplicates only). Now keep in mind two facts, `1 XOR 1 = 0` and `1 XOR 0 = 1`. So essentially all the 0's in the last bits can be "forgotten" about as they don't affect us. Now because we are considering only the duplicates, 1's will be of even number hence XORing them will result in 0. If we then XOR the single number's last bit with 0, we get the single number's last bit as is. Same logic can be applied to all the bits and hence we get the single number. 
## Code
```cpp
int singleNumber(vector<int>& nums) 
{
    int res = 0;
    for(auto&n : nums)
        res = res ^ n; // res = n ^ res also works
    return res;
}
```
## Time Complexity: $O(n)$
## Space Complexity: $O(1)$