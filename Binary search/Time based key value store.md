# [Question](https://leetcode.com/problems/time-based-key-value-store/)
Difficulty: Medium
# Goal
Basically, create a hashmap that can store multiple values for a given key, each value being differed by timestamp. Sort of a linked list attached to each map[key] (but obv, ll is unoptimised)
# Solution
## Trick
attach a vector of pairs to each map[key] and then do binary search on it to retreive the correct value given a timestamp. Keep in mind, you have to return value whose timestamp is greatest integer less than timestamp asked. Binary search comes into play here.
## Code
```cpp
class TimeMap {
public:
    TimeMap() {}
    
    void set(string key, string value, int timestamp) {
        timeMap[key].push_back(std::make_pair(value, timestamp));
    }
    
    string get(string key, int timestamp) {
        if(timeMap.find(key) == timeMap.end()) return "";

        vector<pair<string, int>> &temp = timeMap[key];
        int l = 0, r = temp.size() - 1, m = 0;
        string result;

        while(l <= r){
            m = (l+r)/2;

            if(temp[m].second <= timestamp){
                l = m+1;
                result = temp[m].first;
            }
            else r = m - 1;
        }
        return result;
    }
private:
    unordered_map<string, vector<pair<string, int>>> timeMap;
};
```
## Time Complexity: $O(n\cdot  logm)$
where n is number of keys and m is average number of values for a given key. If we did normal search when retrieve the value corresponding to given key and timestamp, it would take $O(nm)$. 