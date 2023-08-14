# [Question](https://leetcode.com/problems/product-of-array-except-self/)
Difficulty: Medium
# Goal
$ans[i]$ = product of all numbers in array $a$ except $a[i]$ , do this in $O(n)$ without using division
# Solution
## Trick
Use prefix and suffix of a[i].  

![Notes_230517_212509](https://github.com/AdityaPrasad275/Leetcode_DSA/assets/47395463/9b805263-c0a8-4a57-844d-b98bd5eba17d)  

the middle array is the one given to us, top array is prefix array while bottom array(in black) is suffix. 
1. The prefix array is obtained in this manner :  
    1.1. prefix[0] = 1  
    1.2. prefix[i] = prefix[i-1] * a[i-1] for i starting from 1 to n
2. The suffix array is obtained in this manner :  
    2.1. suffix[n] = 1  
    2.2. suffix[i] = suffix[i+1] * a[i] for i starting from n - 1 to 0
3. The bottom array is the answer array.  
    ans[i] = prefix[i] * suffix[i+1] for i starting from 0 to n - 1   

Neetcode's code invovles compressing these two "array generation" steps to one, pretty smart and complicated.

## Code
Simple solution -
```cpp
vector<int> productExceptSelf(vector<int>& a) 
{
    int n = a.size();

    vector<int> prefix(n + 1, 1);
    for(int i = 1; i <= n; i++)
        prefix[i] = prefix[i - 1]*a[i - 1];
    
    vector<int> suffix(n+1, 1);
    for(int i = n-1; i >=0; i--)
        suffix[i] = suffix[i + 1]*a[i];

    vector<int> ans(n, 1);
    for(int i = 0; i < n; i++)
        ans[i] = prefix[i] * suffix[i + 1];
    
    return ans;
}
```
Neetcode's solution -
```cpp
std::vector<int> productExceptSelf(std::vector<int>& nums) 
{
    int n = nums.size();
    std::vector<int> ans(n, 1);

    int prefix = ans[0];
    for (int i = 0; i < n - 1; i++) 
    {
        prefix *= nums[i];
        ans[i+1] *= prefix;
    }

    int postfix = 1;
    ans[n - 1] *= postfix;
    for (int i = n - 1; i > 0; i--) 
    {
        postfix *= nums[i];
        ans[i-1] *= postfix;
    }

    return ans;
}
```
## Time Complexity: $O(n)$
we'e really just looping twice through the given array. Space complexity for neetcode's solution is $O(1)$ while for mine it is $O(n)$.
