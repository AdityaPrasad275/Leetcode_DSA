# [Question](https://neetcode.io/problems/string-encode-and-decode)
Difficulty: medium
Leetcode has this question locked behind premium, so i have included link to neetcode's question
# Goal
Given a list of strings, encode them such that they can be decoded later. The encoded string should be as small as possible.
# Solution
## Trick
I first struggled with thinking of a unique delimiter to add btwn each string such that we know when one string ends and another starts. But then i realised we dont need to check everytime if the delimiter is present or not, we can just add the length of the string before the string itself. now we dont want our string length be confused due to a number in the string itself, so i added a "#" after the length of the string. Now we can easily decode the string by first reading the length of the string and then reading the string itself.

basically -
- encode: `{len of str, "#", str}`
- decode: read len of str, read str

ex
- encode: `["abc", "def"]` -> `"3#abc3#def"`
- decode: `"3#abc3#def"` -> `["abc", "def"]`
## Code
```cpp
/*
    Design algorithm to encode/decode: list of strings <-> string

    Encode/decode w/ non-ASCII delimiter: {len of str, "#", str}

    Time: O(n)
    Space: O(1)
*/

class Codec {
public:

    // Encodes a list of strings to a single string.
    string encode(vector<string>& strs) {
        string result = "";
        
        for (int i = 0; i < strs.size(); i++) {
            string str = strs[i];
            result += to_string(str.size()) + "#" + str;
        }
        
        return result;
    }

    // Decodes a single string to a list of strings.
    vector<string> decode(string s) {
        vector<string> result;
        
        int i = 0;
        while (i < s.size()) {
            int j = i;
            while (s[j] != '#') {
                j++;
            }
            int length = stoi(s.substr(i, j - i));
            string str = s.substr(j + 1, length);
            result.push_back(str);
            i = j + 1 + length;
        }
        
        return result;
    }
private:
};

// Your Codec object will be instantiated and called as such:
// Codec codec;
// codec.decode(codec.encode(strs));

```
## Time Complexity: $O(n)$ for encoding and $O(N)$ for decoding
Where $n$ is the number of strings in the list and $N$ is the total length of the encoded string