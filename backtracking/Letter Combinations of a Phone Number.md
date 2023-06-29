# [Question](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)
Difficulty: Medium (easy tbh)
# Goal
You're given a string of digits, return all possible combinations of letters that the number could represent in a vector of strings. The numbers are mapped to string like a nokia keypad. Basically make permutations. like "abc" and "def" will produce combinations like "ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf".
# Solution
## Trick
parse the string of digits char by char. At each char (which is a digit), use map to get the corresponding string of letters. Iterate through this string of letters and append each letter to the current string. Then call the function recursively with the next index and the new current string. When the index is equal to the size of the string, we have a valid combination, so push it to the result vector.
## Code
```cpp
class Solution {
private:
    unordered_map<char, string> digitMap = {
        {'2', "abc"},
        {'3', "def"},
        {'4', "ghi"},
        {'5', "jkl"},
        {'6', "mno"},
        {'7', "pqrs"},
        {'8', "tuv"},
        {'9', "wxyz"}
    };

public:
    vector<string> letterCombinations(string digits) 
    {
        vector<string> result;
        if (digits.empty()) 
            return result;
        
        backtrack(digits, 0, "", result);
        return result;
    }
    
private:
    void backtrack(const string& digits, int index, const string& current, vector<string>& result) 
    {
        if (index == digits.size()) 
        {
            result.push_back(current);
            return;
        }
        for (char c : digitMap[digits[index]]) 
            backtrack(digits, index + 1, current + c, result);        
    }
};
```
## Time Complexity: $O(3^n)$
Simple backtracking permutation. At each digit, we have 3 choices, so the time complexity is $O(3^n)$ where n is the number of digits.