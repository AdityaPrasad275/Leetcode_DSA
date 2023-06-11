# [Question](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
Difficulty: Medium
# Goal
Given a string, find the length of the longest substring without repeating characters.
# Solution
## Trick
Maintain an unorder_set or hashset which can lookup, insert, erase characters in $O(1)$ time. Maintain two pointers, start = 0 and end = 0. Keep moving end forward until you find a repeating character (this can be done using set.find()). Now move start forward until you find the character which is repeating all the while removing characters from set. Keep track of the max length of the substring.
## Code
```cpp
int lengthOfLongestSubstring(std::string s) {
    std::unordered_set<char> charSet;

    int l  = 0, res = 0;
    for(int r = 0; r < s.size(); r++){
        while(charSet.find(s[r]) != charSet.end()){
            charSet.erase(s[l]);
            l++;
        }
        charSet.insert(s[r]);
        res = std::max(res, r - l + 1);
    }
    return res;
}
```
## Time Complexity: $O(n)$
One loop over the string. Each character is inserted and erased from the set atmost once. Insert and erase operations are $O(1)$ for unorder_set. Space complexity is $O(n)$ for the set.