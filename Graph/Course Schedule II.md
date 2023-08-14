# [Question](https://leetcode.com/problems/course-schedule-ii/)
Difficulty: Med (Built on top of Course Schedule I)
# Goal
Given the total number of courses and a list of prerequisite pairs, return the ordering of courses you should take to finish all courses. 
# Solution
## Trick
We can use course schedule I's way to "traverse" the graph. 
The state solution is most simple. 1 for same path (cycle detection), 2 for courses that can be done(pre req clearance). 
This search for ordering is also called topological sort. Essentially, we are doing DFS on the graph, and then adding the nodes to the result vector in reverse order.
## Code
```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) 
    {
        vector<int> courseState(numCourses, 0); 
        vector<int> res;

        vector<vector<int>> preReq(numCourses, vector<int>());

        for(auto v: prerequisites)
            preReq[v[0]].push_back(v[1]);

        for(int i = 0; i < numCourses; i++)
            if(not helper(preReq, courseState, res, i)) return {};

        return res;
    }
    bool helper(auto& preReq, auto& courseState, auto& res, auto course)
    {
        if(courseState[course] == 1) return false;
        else if(courseState[course] == 2) return true;

        courseState[course] = 1;

        for(auto& c: preReq[course])
            if(not helper(preReq, courseState, res, c)) return false;

        res.push_back(course);
        courseState[course] = 2;
        return true;
    }
};
```
## Time Complexity: $O(n)$
## Space Complexity: $O(n)$
Each node is visited once.
