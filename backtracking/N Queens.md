# [Question](https://leetcode.com/problems/n-queens/)
Difficulty: Hard (way too easy tbh)
# Goal
On a n by n board (n is given), place n queens such that no two queens attack each other. Return all possible solutions in a vector of vectors of strings. The strings represent the board, with 'Q' representing a queen and '.' representing an empty space.
# Solution
## Trick
Use backtracking. it's like looping through 0th row (going every column), inside that loop call func to loop through 1st row (going every column), inside that loop call func to loop through 2nd row (going every column), etc. If we reach the last row, we have a valid solution, so push it to the result vector. If we reach a row where we can't place a queen, backtrack. 

The checking of board is done in the isValid function. As we are going down the board (from 1 row to another) we only need to check the column, upper rows and upper diagonal from our current position. We don't need to check the lower diagonal because we haven't placed any queens there yet.

Comment - I first thought of placing queen at knight's distance (2 and half movement kinda thing that knight does). But this is much simpler and covers everything as it should.
## Cod
```cpp
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) 
    {
        vector<vector<string>> result;
        vector<string> board(n, string(n, '.')); // Initialize empty board
        
        backtrack(0, n, board, result);
        
        return result;
    }
    
private:
    void backtrack(int row, int n, vector<string>& board, vector<vector<string>>& result) 
    {
        if (row == n) 
        {
            result.push_back(board);
            return;
        }
        
        for (int col = 0; col < n; col++) 
        {
            if (isValid(row, col, n, board)) 
            {
                board[row][col] = 'Q'; // Place the queen
                
                backtrack(row + 1, n, board, result); // Move to the next row
                
                board[row][col] = '.'; // Remove the queen (backtrack)
            }
        }
    }
    
    bool isValid(int row, int col, int n, const vector<string>& board) 
    {
        // Check if a queen can be placed at the given position
        
        // Check the column
        for (int i = 0; i < row; i++) 
        {
            if (board[i][col] == 'Q') 
                return false;
        }
        
        // Check the upper-left diagonal
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) 
        {
            if (board[i][j] == 'Q') 
                return false;
        }
        
        // Check the upper-right diagonal
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) 
        {
            if (board[i][j] == 'Q') 
                return false;
        }
        
        return true;
    }
};
```
## Time Complexity: $O(n^n)$
For a tile in 2nd last row, we have n choices (the bottom row). This means $n^2$ combinations. For 3rd last row it would be $n^3$ combinations. So for the whole board the time complexity is $O(n^n)$.