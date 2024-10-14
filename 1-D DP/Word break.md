# [Question](https://leetcode.com/problems/word-break/)
Difficulty: Medium
# Goal
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

# Solution
## Trick
Always remember to simply find recursive soln first and then memoize it.

recursive relation:  
`
f(s) = (s[0,i] exists in dictionary) AND f(s[i:])
`
for i 1 to n

For easy look up of string in dictionary, we can use unordered_set.

## Code
```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) 
    {
      unordered_map<string, bool> dp; 
      unordered_set<string> d(wordDict.begin(), wordDict.end());

      return helper(s, d, dp);
    }
    bool helper(string s, auto& d, auto& dp)
    {
      //cout << s << '\n';
      if(s.size() == 0)
        return true;

      if(dp.find(s) != dp.end())
        return dp[s];

      int n = min((int)s.size(), 20);
      for(int i = 1; i < n+1; i++)
      {
        if(d.find(s.substr(0, i)) != d.end() and helper(s.substr(i), d, dp))
        {
          dp[s] = true;
          dp[s.substr(0, i)] = true;
          dp[s.substr(i)] = true;

          return true;
        }
      }
      return dp[s] = false;
    }
};
```
## Time Complexity: Idk
I never understand DP time complexities. i goes from 1 to n, then fucntion call, in it 1 to n and then..... i dont know. 

So looking at solns, it seems its $O(n^2)$, not completely sure why
here's one explanation:  
Time: $O(N^3 + M)$, where `N <= 300` is length of string s, where `M <= 1000` is length of wordDict.
There are total `N` dp states, they are `dp[0], dp[1],.., dp[n]`, each dp state needs a loop $O(N^2)$ to calculate the result.
Plus the time to build wordSet from wordDict, which is $O(M)$.
So total complexity is: $O(N * N^2 + M)$ = $O(N^3 + M)$.
Space: $O(N + M)$
