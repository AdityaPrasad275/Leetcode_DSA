# [Question](https://leetcode.com/problems/valid-anagram/)
Difficulty: Easy
# Goal 
Find if s and t are anagram or not, basically if s and t have the same letters (count as well as type, basically composition of word)
# Solution 
  ## Trick 
  For $O(n)$ -  
  Maintain a "count" of every letter in alphabet. basically an integer array of length 26 corresponding to abc...xyz (initialised to 0) and for every letter in s we increase the count of corresponding letter in array 
  while for every letter of t we decrease the count of corresponding letter in array. Sort of like a flip switch
  
  For $O(nlogn)$ -  
  Sort both strings and compare them. If they are equal then they are anagrams.

  ## Code
  1. $O(n)$
  ```cpp
bool isAnagram(string s, string t) {
    if(s.size() != t.size()) return false;

    signed int charCount[26] = {0};

    for(int i = 0; i < s.size(); i++){
        charCount[(signed int)(s[i] - 'a')]++;
        charCount[(signed int)(t[i] - 'a')]--;
    }
    for(auto x:charCount){
        if(x!=0) return false;
    }
    return true;
}
  ```
  2. $O(nlogn)$
  ```cpp
  bool isAnagram(string s, string t) 
    {
      sort(s.begin(), s.end());
      sort(t.begin(), t.end());
      return s == t;   
    }
  ```
  ## Time Complexity: $O(n)$
  One loop over the string to match counts in each, then one loop over whole charCount array which takes $O(26)$. 
