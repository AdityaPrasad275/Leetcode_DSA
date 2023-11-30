# [Question](https://leetcode.com/problems/reverse-bits/description/)
Difficulty: Easy
# Goal
Reverse the bits of an unsigned integer.
# Solution
## Trick
One simple solution is to extract the bit representation into a `vector<int>` and then read it appropiately. This will take $O(32)$ time and $O(32)$ space.

A better solution is to use bit manipulation. The point is to take i'th bit and have that bit in (31-i)'th position in result. So we can do this by taking the i'th bit and left shifting it by (31-i) and then ORing it with the result (initialized to 0). We can get the i'th bit like this - `(n >> i) & 1`. 
## Code
1.Simple solution:
```cpp
class Solution 
{
public:
    uint32_t reverseBits(uint32_t n) 
    {
      vector<int> binary(32, 0);
      int i = 31;
      while(n)
      {
        binary[i] = n % 2;
        n = n/2;
        i--;
      } 
      int ans = 0, p = 1;
      for(auto& b: binary)
      {
        ans += b * p;
        p <<= 1;
        cout << b;
      }
      return ans;
    }
};
```
2. Bit manipulation solution:
```cpp
uint32_t reverseBits(uint32_t n) 
{
  int b, res = 0;

  for(int i = 0; i < 32; i++)
  {
    b = (n >> i) & 1;
    res = res | (b << (31 - i));
  }
  return res;
}
```
## Time Complexity: $O(32)$
## Space Complexity: $O(1)$ in the bit manipulation solution, $O(32)$ in the simple solution