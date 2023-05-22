# [Question](https://leetcode.com/problems/3sum/)
Difficulty: On leetcode, medium, but def hard, took an hour
# Goal
Find three numbers in an array that add up to zero. NO dupicates allowed.
# Solution
## Trick
Use two sum II logic, except 'target' is maintained by another pointer that is updated in each iteration.  
To avoid duplicates, first sort. Then when updating pointers, look for nums[ptr-1] == nums[ptr] and skip.
## Code
```
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> ans;
    int p1left = 0;
    while(nums[p1left]<=0 && p1left < nums.size() - 2){
        if(p1left > 0 && nums[p1left-1] == nums[p1left]){ 
            p1left++;
            continue;
        }
        int p2left = p1left + 1, p2right = nums.size() -1;

        while(p2left<p2right){
            if(nums[p1left] + nums[p2left] + nums[p2right] == 0){
                ans.push_back({nums[p1left] , nums[p2left], nums[p2right]});
                p2left++;
                while(nums[p2left-1] == nums[p2left] && p2left < p2right)
                    p2left++;
            }else if(nums[p1left] + nums[p2left] + nums[p2right] < 0){
                p2left++;
            }else p2right--;
        }
        p1left++;
    }
    return ans;
}
```
## Time Complexity: $O(n^2)$
Sorting takes $O(nlogn)$ and iterating through array with pointers takes $O(n^2)$.