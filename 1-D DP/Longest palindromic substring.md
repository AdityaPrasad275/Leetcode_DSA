# [Question](https://leetcode.com/problems/longest-palindromic-substring/)
Difficulty: Medium (lots of annoying edge cases and index confusion)
# Goal
In a string s, find the longest palindromic substring. Substring is a contiguous sequence of characters within the string.
# Solution
## Trick
The smallest palindrome is of length 1. So, we can start from any character in the string and expand outwards to check if the string is a palindrome. We can do this for both odd and even length palindromes.

My first code is a bit messy and solves edge cases indivisually. So here's a much neater code by neetcode.
## Code
```cpp
class Solution 
{
public:
    string longestPalindrome(string s) 
    {
        string res = "";
        int resLen = 0;

        for(int i = 0; i < s.size(); i++)
        {
            checkPalindrome(i, i, resLen, res, s);//checking odd palindromes
            checkPalindrome(i, i+1, resLen, res, s);//checking even palindromes
        }
        return res;
    }
    void checkPalindrome(int l, int r, auto& resLen, auto& res, auto& s)
    {
        while(l >= 0 and r < s.size() and s[l] == s[r])
        {
            if(resLen < r - l + 1)
            {
                res = s.substr(l, r-l+1);
                resLen = r - l + 1;
            }
            l--;
            r++;
        }
        return;
    }
};
```
## Time Complexity: $O(n^2)$
It takes $O(n)$ time to check if a string is a palindrome. We do this for all the characters in the string. So, the time complexity is $O(n^2)$.
## Space Complexity: $O(1)$
We are not using any extra space
