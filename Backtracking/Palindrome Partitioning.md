# [Question](https://leetcode.com/problems/palindrome-partitioning/)
Difficulty: Medium
# Goal
Given a string s, partition s such that every substring of the partition is a palindrome (a vector of strings where all strings are palindrome and are partitions of s). Return all possible palindrome partitioning of s(a vector of vector of strings).
# Solution
## Trick
[Neetcode](https://youtu.be/3jvWodd7ht0) does a great job explaining his solution. I came up with a different solution.It's much slower and a lot complicated to implement but it's basic partioning so easy to grasp concept of. I will explain it here. It can be summerd up as 
> create all partitions($O(2^{l-1})$ time and space), check each partition for requested property ($O(l)$ time for each) and add to result if it has the property.
<details>
<summary>A bit more detailed </summary>
1. Add spaces between each character in the string. These spaces are 'blanks' which can be filled with say '|' to indicate a partition. For example, 'aab' becomes 'a a b' which might then become 'a|a b' which can be thought of as {"a", "ab"}.
2. Now we have spaces/blanks in place, we can use recursion to fill in the blanks and hence get all partitions. This will take $O(2^{l-1})$ time and space where l is the length of the string. This is because we have 2 choices for each blank, either we fill it or we don't. We have l-1 blanks and hence $2^{l-1}$ choices. Also, after this process is done we will have $2^{l-1}$ strings which represent all possible partitions.
3. Now we have all possible partitions, we need to check which ones are palindromes. We check each string to see if it is a palindrome. If it is, we add it to the result vector. This takes $O(l)$ time. Here the trickiness/complexity comes in. As we added space and stuff to the string, we need to work along with it to identify each partition, check them indiviusally. This is a bit tricky to implement. 
</details>

## Code
Neetcode's soln- 
```cpp
class Solution {
public:
    vector<vector<string>> partition(string s) 
    {
        vector<string> curr;
        vector<vector<string>> result;

        dfs(s, 0, curr, result);
        return result;
    }
private:
    void dfs(string s, int start, vector<string>& curr, vector<vector<string>>& result) 
    {
        if (start == s.size()) {
            result.push_back(curr);
            return;
        }
        for (int i = start; i < s.size(); i++) 
        {
            if (isPalindrome(s, start, i)) 
            {
                string str = s.substr(start, i - start + 1);
                curr.push_back(str);
                dfs(s, i + 1, curr, result);
                curr.pop_back();
            }
        }
    }
    bool isPalindrome(string s, int left, int right) 
    {
        while (left < right) 
        {
            if (s[left] != s[right]) 
                return false;
            
            left++;
            right--;
        }
        return true;
    }
};
```

<details>

<summary>My soln</summary>

```cpp
class Solution {
private:
    char part = '|';
    char space = '_';
    vector<string> partitions;
public:
    vector<vector<string>> partition(string s) 
    {
        s = addSpaces(s);
        createAllPartitions(s, 1);
        vector<vector<string>> res;

        for(auto str: partitions)
        {
            if(isValid(str))
                res.push_back(pushbackstr(str));
        }
        cout << "bruh";
        return res;
    }

    void createAllPartitions(string &s, int index)
    {
        if(index >= s.size()){
            partitions.push_back(s);
            return;
        }

        createAllPartitions(s, index + 2);
        s[index] = part;
        createAllPartitions(s, index + 2);
        s[index] = space;
        return;
    }

    string addSpaces(const string& str) 
    {
        string result;
        for (size_t i = 0; i < str.length(); i++) 
        {
            result += str[i];
            if (i != str.length() - 1) 
                result += space;
        }
        return result;
    }

    bool isValid(string &s)
    {
        int l = 0, r = 0;
        while(r < s.size()){
            while(r < s.size() -1 && s[r+1] != part)
                r++;
            
            if(not check(s, l, r))
                return false;
            l = r + 2;
            r = l;
        }
        return true;
    }

    bool check(string &s, int l, int r)
    {
        while(l<r)
        {
            if(s[l] != s[r])
                return false;
            l++;
            r--;
        }
        return true;
    }

    vector<string> pushbackstr(string &s)
    {
        string substr;
        vector<string> res;

        for(auto c: s)
        {
            if(c == part){
                res.push_back(substr);
                substr = "";
            }
            else if(c != space)
                substr += c;
        }
        
        res.push_back(substr);
        return res;
    }
};
```
</details>

## Time Complexity: $O(n\cdot 2^n)$
Where n is the length of the string. Neetcode's solution takes $O(n)$ space while mine takes $O(2^n)$ space.