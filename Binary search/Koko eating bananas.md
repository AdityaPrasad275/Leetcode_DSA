# [Question](https://leetcode.com/problems/koko-eating-bananas/)
Difficulty: Medium
# Goal
Given an array, find minimum k such that the following sum is less than or equal to a given h.
```
for a in arr:
    sum += ceil(a/k);
```
# Solution
## Trick
As it turns out, sum $\geq$ arr.size(). Greatest value of sum will be when k = 1 and smallest when k = max(arr). So we do a binary search in {1, 2, ... max(arr)} and find min k such that the sum $\leq$ h.
## Code
```
int minEatingSpeed(std::vector<int>& piles, int h) {
    int l = 1, r = piles[std::max_element(piles.begin(), piles.end()) - piles.begin()];
    int k = 0, minK = r;

    while(l<=r){
        k = (l+r)/2;

        if(sum(piles, k) <= h){
            r = k - 1;
            minK = std::min(minK, k);
        }else l = k + 1;
    }
    return minK;
}
long long int sum(std::vector<int>& piles, int k){
    long long int sum = 0;
    for(auto elem:piles)
        sum+= std::ceil((double)elem/k);
    return sum;
}
```
## Time Complexity: $O(nlogm)$
Where n is size of array and m is max element of array.  
 Space complexity is $O(1)$