# [Question](https://leetcode.com/problems/largest-rectangle-in-histogram/)
Difficulty: Hard
# Goal
Given a histogram(or a bunch of consecutive width 1 bars), find the area of the largest rectangle in it. Input is in vector\<int>
# Solution
## Trick
Find nextSmaller and prevSmaller elements for every height[i]. Now this window between prev and next smaller is gonna have all hieghts >= height[i]. So we can find the common area. Maximise this. Also, refer [this](./great%20stack%20resource.md) for a great understanding of stack
## Code
```cpp
int largestRectangleArea(vector<int>& heights) 
{
    vector<int> nextSmaller(heights.size(), heights.size());
    vector<int> prevSmaller(heights.size(), -1);
    stack<int> st;

    for(int i = 0; i < heights.size(); i++)
    {
        while(st.size() && heights[st.top()] > heights[i])
        {
            nextSmaller[st.top()] = i;
            st.pop();
        }
        if(st.size()) prevSmaller[i] = st.top();
        st.push(i);
    }   

    int maxArea = 0;
    for(int i = 0; i < heights.size(); i++)
    {
        maxArea = max(maxArea, heights[i]*(nextSmaller[i] - prevSmaller[i] - 1));
    }
    return maxArea;
}
```
## Time Complexity:$O(n)$
Every stack element is accessed atmost 4 times and each access is constant time so $O(4n)$ 