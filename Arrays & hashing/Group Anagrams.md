# [Question](https://leetcode.com/problems/group-anagrams/)
Difficulty: Medium

# Goal
In a vector of strings, group Anagrams together. Anagrams are words with same "compostion" of letter. [eat, tea, ate]

# Solution
## trick 
If we sort every string in given vector, every anagram will become same word ( [eat, tea, ate] => [aet, aet, aet] ).
So we make a hashmap where every string is mapped to it's sorted version. The sorted version acts as the key to group of anagrams.

## code
```cpp
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> group;

    for(int i = 0; i < strs.size(); i++){
        string s = strs[i];
        sort(s.begin(), s.end());
        group[s].push_back(strs[i]);
    }
    vector<vector<string>> ans;

    for(auto it: group){
        ans.push_back(it.second);
    }
    return ans;
}
```
## Time Complexity: O(m * n log n )
M is the size of the given vector of strings (or how many strings there are) while n is average length of a string. n log n is the time taken by sort algorithm.  
  
It is possible to convert this to O(c * m * n) using hashing of strings or what neetcode said, mapping int array of string to string ("eat" => [1a, 1e, 1t], "ate" => [1a, 1e, 1t]
But both of these worse time and space scores on leetcode so no idea how it is better
