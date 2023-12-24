# [Question](https://leetcode.com/problems/permutation-in-string/)
Difficulty: Medium
# Goal
Given s1, s2. We have look for a substring in s2 which is a permutation of s1.
# Solution
## Trick
Maintain a frequency hashMap/array for s1, subtring in s2. Make a sliding window using left and right pointers. Each time you move right pointer, add the character to the substring frequency array. Each time you move left pointer, remove the character from the substring frequency array. If the substring frequency array is equal to s1 frequency array, return true. (which you can directly do using v1 == v2, no need to iterate lol).
## Code
```cpp
bool checkInclusion(string s1, string s2) {
    if (s1.size() > s2.size()) return false;
    vector<int> s1v (26, 0),s2v (26, 0);
    int l = 0, r = 0;

    for (auto c : s1) s1v[c - 'a']++;

    while (r < s2.size()) {
        s2v[s2[r]-'a']++;

        if (r - l + 1 == s1.size()) 
            if (s1v == s2v) return true;

        if (r - l + 1 < s1.size()) r++;
        else {
            s2v[s2[l]-'a']--;
            l++;
            r++;
        }
    }
    return false;
}
```
## Time Complexity: $O(n)$
