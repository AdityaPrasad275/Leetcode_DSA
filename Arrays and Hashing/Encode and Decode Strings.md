# [Question](https://www.lintcode.com/problem/659/description)
Difficulty: Medium (provided by [LintCode](https://www.lintcode.com/))
# Goal
Encode a list of strings to a string. Decode this string back to original vector of strings. No "class internal" data structure should be used.
# Solution
## Trick
A simple trick like adding a '#' between each string can be used to solve this problem. However, this trick is not applicable to all cases. For example, if the string contains '#', then the decoding process will be ambiguous. Therefore, we need to find a way to encode the string without ambiguity.

A simple workaround for this is to add the string length and then add the '#'. Not a simple number but number + '#'. The '#' marks the end of the string length. Then we iterater over our string for that length/times and we can unambigiously decode the string. 
## Code
```cpp
class Solution {
public:
    /*
     * @param strs: a list of strings
     * @return: encodes a list of strings to a single string.
     */
    string encode(vector<string> &strs) 
    {
        // write your code here
        string res = "";

        for(auto& str: strs)
            res += eh(str);
        cout << '\n';
        return res;
    }
    string eh(string& s)
    {
        int n = s.size();

        if(n == 0)
            return "0#";

        string res = "";
        while(n)
        {
            res += n%10 + '0';
            n = n/10;
        }
        res += '#';
        res += s;
        
        return res;
    }
    /*
     * @param str: A string
     * @return: decodes a single string to a list of strings
     */
    vector<string> decode(string &str) 
    {
        // write your code here
        if(str.size() == 0)
            return {};

        int i  = 0;
        vector<string> res;
        while(i < str.size())
        {
            string num = "";
            while(str[i] != '#')
            {
                num += str[i];
                i++;
            }
            i++;

            int n = 0, t = 1, j = 0;
            while(j < num.size())
            {
                n += (num[j] - '0')*t;
                t = t*10;
                j++;
            }
            
            string ans = "";
            while(n--)
            {
                ans += str[i];
                i++;
            }
            res.push_back(ans);
        }
        return res;
    }
};
```
## Time Complexity: $O(n \cdot)$