# [Question](https://leetcode.com/problems/top-k-frequent-elements/)
Difficulty: Medium

# Goal
Find k most frequent elements in a vector of int

# Solution
## trick
map every element to its frequency using hasmap, sort it in descending order using sort, vector of pairs and a comparision function (which is third argument of sort)
## code
```cpp
vector<int> topKFrequent(vector<int>& nums, int k) 
{
    unordered_map<int, int> freqMap;

    for (auto x : nums)
        freqMap[x]++;

    //in case every element is unique
    if(freqMap.size() == nums.size())
        return nums;

    vector<pair<int, int>> vOfPairs;
    vector<int> ans;

    for (auto& it : freqMap)
        vOfPairs.push_back(it);

    
    sort(vOfPairs.begin(), vOfPairs.end(), [](auto &x, auto &y){return x.second > y.second;});

    for (size_t i = 0; i < k; i++)
        ans.push_back(vOfPairs[i].first);

    return ans;
}
```
## Time Complexity: $O(mlogm)$
$m$ is the number of distinct elements.We sort this vector of distinct elements (well pairs, elements and their frequencies)  
This would approach n making it $O( n log n)$ but i added an if to shave just a bit (takes it from beats 50% to 90% runtime)
