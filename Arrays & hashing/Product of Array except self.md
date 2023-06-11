# [Question](https://leetcode.com/problems/product-of-array-except-self/)
Difficulty: Medium
# Goal
A[i] = product of all numbers in a except a[i] , do this in O(n) without using division
# Solution
## Trick
Use prefix and suffix of a[i].  
![Notes_230517_212509](https://github.com/AdityaPrasad275/Leetcode_DSA/assets/47395463/9b805263-c0a8-4a57-844d-b98bd5eba17d)  
the middle array is the one given to us, top array is prefix array while bottom array(in black) is suffix. The bottomost array(in red) is obtained by multiplying prefix and suffix arrays
The code invovles compressing these two "array generation" steps to one to get O(n).

## Code
```cpp
std::vector<int> productExceptSelf(std::vector<int>& nums) {
    int l = nums.size();
    int prefix = 1;
    std::vector<int> ans(l, 1);

    for (int i = 0; i < l - 1; i++) {
        prefix *= nums[i];
        ans[i+1] *= prefix;
    }

    int postfix = 1;
    ans[l - 1] *= postfix;
    for (int i = l - 1; i > 0; i--) {
        postfix *= nums[i];
        ans[i-1] *= postfix;
    }

    return ans;
}
```
## Time Complexity: O(n)
we'e really just looping twice through the given array
