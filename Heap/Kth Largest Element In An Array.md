# [Question](https://leetcode.com/problems/kth-largest-element-in-an-array/)
Difficulty: Medium
# Goal
Given an array nums and an integer k, return the kth largest element in the array. Can you do it without sorting?
# Solution
## Trick
Quite a lot of solutions! Let's see them one by one, increasingly getting faster (slightly but still)

<details>
<summary> Sorting </summary>

Just sort and get the nums[nums.size() - k] that's it. But that's $O(nlogn)$, we can do better.
</details>

<details>
<summary> Priority_queue / minHeap</summary>

A simple alternative is use a min heap. Insert all elements and pop till size is k. The top element is the answer. This is $O(nlog(n))$. Still same as sorting. In this there are two ways. Insert using a for loop which takes $O(nlog(n))$ or insert using a priority queue constructor which takes $O(n)$. The latter is faster. The popping still takes $O(nlog(n))$. So overall it's $O(nlog(n))$.


We can make this slightly more efficient by only adding to the min heap if the current element is greater than the top element. This will generate a min heap of size k and it's such that it contains k greatest elements. This is $O(nlog(k))$.

<details>
<summary> two comments for this </summary>

1. Inserting into priority_queue using for loop actually,takes $O(log(n!))$ but because it's big O notation, we can ignore and just say it's $O(nlog(n))$.
2. Popping from priority_queue actually takes $O(log(n!) - log(k!))$ which is again equivalent to $O(nlog(n))$
</details>

</details>

<details>
<summary>Quick Select </summary>

We can make this a bit more efficient using quickselect algorithm. This is $O(n)$ on average and $O(n^2)$ in worst case. This is because quickselect is a randomized algorithm. It's like quicksort but instead of sorting the entire array, we only sort the part of the array that contains the kth largest element. This is done by partitioning the array. The partitioning is done in such a way that the pivot element is in it's correct position(all elements to the left of it are lower than it, all elements to the right are greater than it). If the pivot element is in the kth position, we are done. If it's in a position greater than k, we only need to sort the left part of the array. If it's in a position less than k, we only need to sort the right part of the array. This is done recursively. The worst case is when the pivot element is the smallest element in the array. This happens when the array is already sorted. In this case, the partitioning is done in such a way that the pivot element is the first element. This is $O(n^2)$.

<details>
<summary> Partitioning and how algo works </summary>

Here's a sort of explanation of algorithm works -  
Array - [l, l, m, l, l, m, p]  
l - less than pivot  
m - greater to pivot

a for loop is used to iterate over the array. So imagine a i pointer that moves from left to right. There's another pointer p which is used to mark elements that are greater than arr[p] (m).
Start from i = 0, p = 0. As l < p, swap arr[i] and arr[p]. Increment p. (as i = p, we are swapping the same element, so nothing happens). Now when we arrive at m, we increment i as a part of for loop but we dont increment p. Now when we go ahead and get an 'l' , we swap arr[i] and arr[p] thus swapping l and m. This continues till we reach the end of the array. At the end, we swap arr[p] and arr[end] thus putting the pivot element in it's correct position. Now we have a partitioned array.    
arr - [l, l, l, l, p, m, m]  
All elements to the left of p are less than p and all elements to the right of p are greater than p. 
This is standard paritioning in quicksort algo. Though in quicksort we recursively go through left AND right of p, in quickselect we only go to the part where we have to find kth largest element. Standard quicksort takes $O(nlogn)$ while quickselect takes $O(n)$ on average and $O(n^2)$ in worst case.
</details>

</details>

## Code
<details>
<summary> Quickselect</summary>

```cpp
int findKthLargest(vector<int>& nums, int k) 
{
    return helper(0, nums.size() - 1, nums, k);
}
int helper(int l, int r, vector<int> &nums, int k)
{
    int p = l;

    for(int i = l; i < r; i++)
    {
        if(nums[i]<=nums[r]){
            swap(nums[i], nums[p]);
            p++;
        }
    }
    swap(nums[r], nums[p]);

    if(p < nums.size() - k) return helper(p+1, r, nums, k);
    else if(p>nums.size() -k) return helper(l, p-1, nums, k);
    else return nums[p];
}
```
Comment - does pretty bad on leetcode but is $O(n)$ on average so it's good.
</details>

<details>
<summary> Priority Queue solutions</summary>

1.  $o(nlog(n))$ solution

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> mnh(nums.begin(), nums.end());
        
        while(mnh.size() > k)
            mnh.pop();
        return mnh.top();
    }
};
```
2. $O(nlog(k))$ solution

```cpp
int findKthLargest(vector<int>& nums, int k) 
{
    priority_queue<int, vector<int>, greater<int>> mnh;
    int count = 0;
    for(auto n: nums)
    {
        if(count < k)
            mnh.push(n);
        else{
            if(mnh.top() < n){
                mnh.pop();
                mnh.push(n);
            }
        }
        count++;
    }
    
    return mnh.top();
}
```
</details>

<details>
<summary> Good ol' sorting </summary>

```cpp
int findKthLargest(vector<int>& nums, int k) 
{
    sort(nums.begin(), nums.end());
    return nums[nums.size() - k];
}
```

</details>

## Time Complexity:
1. Quickselect - $O(n)$ on average, $O(n^2)$ in worst case
2. Priority Queue - $O(nlog(n))$ and $O(nlog(k))$
3. Sorting - $O(nlog(n))$

## Space Complexity:
1. Quickselect - $O(1)$
2. Priority Queue - $O(n)$
3. Sorting - $O(1)$

Amazing how minHeap $O(nlogk)$ does best on leetcode , then sorting and in the last is quickselect. I guess it's because quickselect is randomized and leetcode runs the code multiple times to get the average time. So it's not really $O(n)$ on average.
