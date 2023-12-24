# [Question](https://leetcode.com/problems/k-closest-points-to-origin/)
Difficulty: Medium
# Goal
Given n points, find the k closest points to the origin (0, 0) in 2D plane. Return the points in a vector of vectors of integers.
# Solution
## Trick
Quite a lot of things. One simple thing is to just make pairs of distance and points and then sort them. Then just take the first k points. This is $O(nlogn)$.

Another thing is to use a maxHeap. This is $O(nlogk)$. The idea is to keep a heap of size k. Then for each point, we check if the distance is smaller than the top of the heap. If it is, then we pop the top and push the new point. This way, we can keep the heap of size k and ensure that the elements are closest to origin. Then we just return the heap.
## Code
1. Short, simple code 
```cpp
vector<vector<int>> kClosest(vector<vector<int>>& points, int k) 
{
    priority_queue<pair<double, vector<int>>> minHeap;

    for(auto p:points)
    {
        minHeap.push({(p[0]*p[0]+p[1]*p[1]), p});
        if(minHeap.size() > k) minHeap.pop();
    }
    vector<vector<int>> res;
    while(minHeap.size())
    {
        res.push_back(minHeap.top().second);
        minHeap.pop();
    }
    return res;
}
```
2. Long, more complicated but elegant code exposing how priority is given in heap
```cpp
class Solution {
public:
    struct Point 
    {
        int x;
        int y;
        double distance;

        Point(int _x, int _y) : x(_x), y(_y) {
            distance = sqrt(x * x + y * y);
        }
    };

    struct ComparePoints {
        bool operator()(const Point& p1, const Point& p2) 
        {
            return p1.distance < p2.distance;
        }
    };

    std::vector<std::vector<int>> kClosest(std::vector<std::vector<int>>& points, int K) 
    {
        std::priority_queue<Point, std::vector<Point>, ComparePoints> minHeap;

        for (const auto& point : points) 
        {
            int x = point[0];
            int y = point[1];
            Point p(x, y);

            minHeap.push(p);

            if (minHeap.size() > K) 
                minHeap.pop();        
        }

        std::vector<std::vector<int>> result;

        while (!minHeap.empty()) 
        {
            Point p = minHeap.top();
            minHeap.pop();

            result.push_back({p.x, p.y});
        }
        return result;
    }
};
```
## Time Complexity: $O(nlogn)$
## Space Complexity: $O(n)$