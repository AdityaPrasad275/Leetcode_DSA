# Difficulty 
Easy
# Goal 
Find if s and t are anagram or not, basically if s and t have the same letters (count as well as type, basically composition of word)
# Solution 
  ## trick 
  Maintain a "count" of every letter in alphabet. basically an integer array of length 26 corresponding to abc...xyz (initialised to 0) and for every letter in s we increase the count of corresponding letter in array 
  while for every letter of t we decrease the count of corresponding letter in array. Sort of like a flip switch
  
  ## Code
  ```
  class Solution {
    public:
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

    };
  ```
