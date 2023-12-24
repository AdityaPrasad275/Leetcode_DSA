# [Question](https://leetcode.com/problems/course-schedule/)
Difficulty: Medium
# Goal
Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?
# Solution
## Trick
Cycle detection in a directed graph. A bit complex DFS. 
First we take our prerequisites pairs and make an adjacency list. Then we do DFS on each node. If we encounter a node that is already visited, then we have a cycle.

We also need to keep in mind which courses can be done. If the prerequisites of a course are empty, then we can do that course. So we need to keep track of that as well.   
One way is to succesively remove the prerequisites of a course as we do DFS. This way we can keep track of which courses can be done.  

Anothe way is to sort of use state. Suppose you explored a path and found that that path can be done. Now suppose you're exploring a new path which then merges with the old one. You can do the new path as well. This use state also keeps track of cycles. 
## Code
1. Neetcode's soln - emptying prerequisites as we go along
```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) 
    {
        vector<bool> visited(numCourses, false); 
        unordered_map<int, vector<int>> preReq;

        for(auto v: prerequisites)
            preReq[v[0]].push_back(v[1]);

        for(int i = 0; i < numCourses; i++)
            if(not helper(visited, preReq, i)) return false;

        return true;
    }
    bool helper(auto& visited, auto& preReq, auto& course)
    {
        if(visited[course]) return false;
        if(preReq[course].empty()) return true;
        
        visited[course] = true;
        for(auto c: preReq[course])
            if(not helper(visited, preReq, c)) return false;

        visited[course] = false;
        preReq[course] = {};
        return true;
    }
};
```
2. Using state (borrowed from leetcode)
```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) 
    {
        vector<int> courseState(numCourses, 0);

        vector<vector<int>> prereqs(numCourses, vector<int>());
        for (auto& edge : prerequisites)
            prereqs[edge[0]].push_back(edge[1]);

        for (int i = 0; i < numCourses; i++)
            if (not canFinish(prereqs, i, courseState)) return false;

        return true;
    }

    bool canFinish(vector<vector<int>>& prereqs, int course, vector<int>& courseState) 
    {
        if (courseState[course] == 2) return true;
        else if (courseState[course] == 1) return false;
        
        courseState[course] = 1;

        for (int prereq : prereqs[course])
            if (!canFinish(prereqs, prereq, courseState)) return false;

        courseState[course] = 2;
        return true;
    }
};
```
## Time Complexity: $O(n)$
Because we empty the prerequisites as we go along, we don't visit a node more than once. So the time complexity is $O(n)$.

The state method is also $O(n)$ because we don't visit a node more than once.