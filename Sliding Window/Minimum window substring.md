# [Question](https://leetcode.com/problems/minimum-window-substring/)
Difficulty: H A R D. took me 3 fukin hrs gah damn. solved it tle in 30 min tho lol.
# Goal
Given a string s, We have to find the smallest substring that contains all characters of another given string t.
# Solution
## Trick
Complicated sliding window algo.
Have two frequency hashmaps, one for t and one for s.
Have two pointers, l and r. r increases our window size, l decreases our window size. if in our current window we don't have all the characters of t, we increase r. if we do have all the characters of t, we decrease l to the point we get the smallest window that houses every character of t. The r and l updation algo took me three hours, ain't no easy thing. [Neetcode](https://youtu.be/jSto0O4AJbM) explains it amazingly.
## Code
```cpp
string minWindow(string s, string t) {
    if(t.size() > s.size())
        return "";

    unordered_map<char, int> tmap;
    unordered_map<char, int> smap;

    for(auto c:t)
        tmap[c]++;

    int have = 0, need = tmap.size(), maxLen = INT_MAX, ansL = 0, l = 0;

    for (int r = 0; r < s.size(); r++){
        char c = s[r];
        smap[c]++;

        if(tmap.find(c) != tmap.end() && smap[c] == tmap[c])
            have++;

        while(have==need){
            if(r - l + 1 < maxLen){
                ansL = l;
                maxLen = r - l + 1;
            }
            char b = s[l];
            smap[b]--;
            if(tmap.find(b) != tmap.end() && smap[b] < tmap[b])
                have--;
            l++;
        }            
    }
    return (maxLen < INT_MAX) ? s.substr(ansL, maxLen) : "";
}

```
## Time Complexity: $O(n)$

Every time we update points, we do 2 $O(1)$ operations. Every character in s is visited twice, once by l and once by r. So a total of $O(4n)$ which is $O(n)$. Space complexity is $O(n+m)$ where n is size of s and m is size of t.