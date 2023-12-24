# [Question](https://leetcode.com/problems/palindromic-substrings/)
Difficulty: Medium (way too easy if you know how to solve Longest palindromic substring)
# Goal
In a string s, find the number of palindromic substrings. Substring is a contiguous sequence of characters within the string.
# Solution
## Trick
Each character is a palindrome. If we expand from one character outwards and everytime we get s[l] = s[r] we count++. We do this for both odd and even length palindromes. 
This time we don't need to store the palindromes. We just need to count them, so it's a lot easier.
## Code
```cpp
class Solution 
{
public:
    int countSubstrings(string s) 
    {
        int count = 0;

        for(int i = 0; i < s.size(); i++)
        {
            checkPali(i, i, s, count);//odd length palindromes
            checkPali(i, i+1, s, count);//even length palindromes
        }
        return count;
    }
    void checkPali(int l, int r, string& s, int& count)
    {
        while(l>=0 and r < s.size() and s[l] == s[r])
        {
            count++;
            l--;
            r++;
        }
    }
};
```
## Time Complexity: $O(n^2)$
It takes $O(n)$ time to check if a string is a palindrome. We do this for all the characters in the string. So, the time complexity is $O(n^2)$.
## Space Complexity: $O(1)$
We are not using any extra space
