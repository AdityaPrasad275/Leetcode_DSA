# Difficuly
Easy
# Goal
find two numbers in arr such that they add up to target.
eg. [2, 3, 4] and target = 7, return [1, 2] indices
# Solution
## trick
a hashmap (or a (int, int) map) that maps nums to indices. we loop through arr, find if (target - arr[i]) is already in the loop. 
## code
```
class Solution {
  public:
      vector<int> twoSum(vector<int>& nums, int target) {
          map<int, int> indexStore;

          for(int i = 0; i < nums.size(); i++){
              if(indexStore.find(target - nums[i]) == indexStore.end()){     
                  indexStore[nums[i]] = i;
              }
              else return {indexStore[target - nums[i]], i};
          }
          return {-1, -1};
      }
 };
```
