# [Question](https://leetcode.com/problems/decode-ways/description/)
Difficulty: Medium (dp begins to get hard)
# Goal
Given an encoding of "1" - "A" and "2" - "B", find the number of ways to decode a string of numbers. For example, "12" can be decoded as "AB" or "L", so the answer is 2.
# Solution
## Trick
DP is just glorified recursion lmao. Form the decision tree and then memoize the results. 

The decision is that we either take the current character or current + next character as one unit and then get to the rest of the string. From this the following recursion relation is fairly easy to arrive at -   
```
count(i) = ( isValid( s[i] ) ) * count(i+1) + ( isVaild( s[i:i+1] ) ) * count(i+2)

                            ^                               ^
                    taking one character                taking two characters
```
where count(i) is the number of ways the substring s[ i : end] can be decoded and isValid(string s) return 0 if s is valid and 1 otherwise. (valid string is from "1" to "26").

Then to turn to DP, we make count(i) into an array of size n + 1 with the following initial conditions -
```
count[n] = 1;
count[n-1] = (s[n-1] == '0') ? 0 : 1;
```

and then we fill the array from the back using the above recursion relation. The answer is count[0].

## Code
```cpp
class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        vector<int> count(n+1, 0);

        count[n] = 1;
        count[n-1] = (s[n-1] == '0') ? 0 : 1;

        for(int i = n - 2; i > -1; i--)
        {
            count[i] = isValid(s.substr(i, 1)) * count[i+1] + isValid(s.substr(i, 2)) * count[i+2];
        }

        return count[0];
    }

    int isValid(string s)
    {
        if(s.size() == 1)
        {
            if(s == "0") return 0;
            else return 1;
        }

        if(s.size() == 2)
        {
            string allowed = "0123456";

            switch(s[0])
            {
                case '1':
                    return 1;
                case '2':
                    if(allowed.find(s[1], 0) != string::npos) return 1;
                    else return 0;
                default:
                    return 0;
            }
        }
        return 0;
    }
};
```
## Time Complexity: $O(n)$
recursion would take $O(2^n)$ time. DP takes $O(n)$ time. DP is just recursion with memoization.

## Space Complexity: $O(n)$
We are using an array of size n + 1.
