# [Question](https://leetcode.com/problems/valid-palindrome/)
Difficulty : Easy

# Goal
Given a string, strip away spaces, punctuations, find if its a valid palindrome (is same whether read from left to right)

# Solution
## trick
Use isalnum() inbuilt function (or create one) to only check alpha numeric characters. Use left and right pointers and come closer with each iteration until $l > r$

## code
```cpp
bool isPalindrome(string s){
        int left = 0, right = s.size()-1;

        while(left < right){
            while(left < right && !isalnum(s[left])) left++;
            while(left < right && !isalnum(s[right])) right--;
            if(tolower(s[left]) != tolower(s[right]))
                return false;
            left++;
            right--;
        }
        return true;
    }
```
## Time Complexity: $O(n)$