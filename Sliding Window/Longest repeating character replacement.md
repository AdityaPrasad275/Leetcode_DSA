# [Question](https://leetcode.com/problems/longest-repeating-character-replacement/)
Difficulty: Medium
# Goal
Given a string s, find k spots in it such that if we replace these spots with any desired character, it forms the longest substring with repeating characters (all characters are uppercase alphabets). Return the length of this substring.
# Solution
## Trick
l = 0, r = 0 to s.end().
Now in this l-r window, find the character which repeats the most(using hashmap or an alphabet map (26 length array)).

Now in this window, if we can replace all the remaining characters with the most repeating character, then we have a valid substring.  If we cannot, move l forward. We can iteratively find maxLength of the substring.
## Code
```cpp
int characterReplacement(std::string s, int k) {
    int l = 0, maxLength = 0, maxFreq = 0;
    std::unordered_map<char, int> charFreq;

    for (int r = 0; r < s.size(); r++)
    {
        charFreq[s[r]]++;
        maxFreq = std::max(maxFreq, charFreq[s[r]]);
        if(r-l+1 - maxFreq> k){
            charFreq[s[l]]--;
            l++;
        }
        maxLength = std::max(maxLength, r - l + 1);
    }
    
    return maxLength;
}
```
## Time Complexity: $O(n)$
One loop over the string. Now in maxFreq i did a smort thing which reduced ~ $O(26n)$ to $O(n)$. Normally we would iterate over whole map to find max but just doing `maxFreq = std::max(maxFreq, charFreq[s[r]]);` is actually enough. This is because if the current character is not the most frequent character, then the maxFreq will not change. If it is the most frequent character, then maxFreq will change. So we are not iterating over the whole map. Space complexity is at max $O(26)$ for the map.
