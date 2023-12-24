# [Question](https://leetcode.com/problems/task-scheduler/)
Difficulty: Medium (quite hard to code)
# Goal
Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks

ex - ["A","A","A","B","B","B"], n = 2
output - 8
explanation - A -> B -> idle -> A -> B -> idle -> A -> B
# Solution
## Trick
There are two solutions. 1 involves math and the other involves heaps. The math solution is quite tricky and I didn't understand it. So I'll explain the heap solution. You can find math solution [here](https://leetcode.com/problems/task-scheduler/solutions/104500/java-o-n-time-o-1-space-1-pass-no-sorting-solution-with-detailed-explanation/).  
Heap solution -   
Two things, minHeap and queue. Insert character frequency into min heap first. Then 'doing a task' corresponds to popping from the heap and decrementing the frequency. Now we need to know when do we do this task next. For this we have a queue of pair<int, int> which stores the frequency and 'next time', the time t when we can do this task again. We use a queue due to it's fifo property. So we progressively do a task, pop from minHeap, add it to queue and decrement its frequency and note it's time. Then when the time comes, pop_front() from the queue and insert it back into minHeap. We do this till all tasks are done which corresponds to minHeap being empty and queue being empty.

Simply put, do task, pop from heap, add to queue and then add back to heap when time comes. Do this till all tasks are done. Coding this is quite a lot of ifs.
## Code
```cpp
int leastInterval(vector<char>& tasks, int n) {
    unordered_map<char, int> cfm;
    priority_queue<int> mxh;

    for(auto c: tasks)
        cfm[c]++;

    for(auto p:cfm)
        mxh.push(p.second);
    
    queue<pair<int, int>> q;
    int t = 0;

    while(not mxh.empty() or not q.empty())
    {
        t++;
        if(not mxh.empty())
        {
            if(mxh.top() > 1) q.push({mxh.top() - 1, t + n});
            mxh.pop();
        }
        if(not q.empty() and q.front().second == t) 
        {
            mxh.push(q.front().first);
            q.pop();
        }
    }
    return t;
}
```
## Time Complexity: $O(l)$
$l$ = length of tasks (didnt use $n$ because it is used for cooldown)
pop and push for minHeap takes around $log26$ and we do this for about as many times as the max frequency. Which can be at max l. So $O(llog26)$ which is $O(l)$