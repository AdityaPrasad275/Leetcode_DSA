# [Question](https://leetcode.com/problems/median-of-two-sorted-arrays/)
Difficulty: Hard
# Goal
Given two sorted arrays, find median of comined array in $O(log(m+n))$ time.
# Solution
## Trick
It's not a trick, it's a whole algorithm. Neetcode explains the best - [soln](https://youtu.be/q6IEA26hvXc)
## Code
```cpp
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    vector<int> &a = (nums1.size() <= nums2.size()) ? nums1 : nums2;
    vector<int> &b = (nums1.size() > nums2.size()) ? nums1 : nums2;
    constexpr double INF = std::numeric_limits<double>::infinity();
    int left = 0, right = a.size() - 1, i = 0, j = 0;

    while(true){
        i = (left + right < 0) ? -1 : (left + right) / 2;
        j = (a.size() + b.size()) / 2 - i - 2;
        double aLeft = (i < 0) ? -INF : a[i];
        double aRight = (i + 1 >= a.size()) ? INF : a[i + 1];
        double bLeft = (j < 0) ? -INF : b[j];
        double bRight = (j + 1 >= b.size()) ? INF : b[j + 1];

        if(aLeft <= bRight && bLeft <= aRight){
            if((a.size() + b.size()) % 2) return std::min(aRight, bRight);
            else return (std::max(aLeft, bLeft) + std::min(bRight, aRight)) / 2;
        }
        if(aLeft > bRight) right = i - 1;
        else left = i + 1;
    }
}
```
## Time Complexity: $O(logt)$
Where $t$ is the size of the smaller array.
The question asked for $O(log(m+n))$ but the solution is $O(log(min(m, n)))$. This is because we are doing binary search on the smaller array. The reason for this is that we are trying to find the partition point in the smaller array. The partition point in the larger array is determined by the partition point in the smaller array. So, we do binary search on the smaller array to find the partition point. This is the reason why we are doing binary search on the smaller array.