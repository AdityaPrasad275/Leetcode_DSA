# [Question](https://leetcode.com/problems/valid-sudoku/)
Difficulty: Medium
# Goal
Given a 9x9 sudoku board, determine if it is valid.
## trick
Check if given sudoku is valid or nah, which involves three steps:  
1) check every row for unique 1-9  
2) check every column for uniqueness
3) check every 3x3 cell for uniqueness  
Use unordered set
## code
```cpp
bool isValidSudoku(std::vector<std::vector<char>>& board) 
{
    
    std::unordered_set<char> seen;
    char c;
    // check rows
    for (int i = 0; i < 9; i++) 
    {
        seen.clear();
        for (int j = 0; j < 9; j++)
        {
            c = board[i][j];
            if (c != '.') 
            {
                if (seen.count(c)) return false;
                seen.insert(c);
            }
        }
    }
    // check columns
    for (int j = 0; j < 9; j++) 
    {
        seen.clear();
        for (int i = 0; i < 9; i++) 
        {
            c = board[i][j];
            if (c != '.') 
            {
                if (seen.count(c)) return false;
                seen.insert(c);
            }
        }
    }
    // check 3x3 sub-boxes
    /*
    k indices =>
    [ 0 | 3 | 6]
    [ 1 | 4 | 7]
    [ 2 | 5 | 8]
    */
    for (int k = 0; k < 9; k++) 
    {
        seen.clear();
        for (int i = k/3*3; i < k/3*3+3; i++) 
        {
            for (int j = k%3*3; j < k%3*3+3; j++) 
            {
                c = board[i][j];
                if (c != '.') 
                {
                    if (seen.count(c)) return false;
                    seen.insert(c);
                }
            }
        }   
    }

    return true;
}
```

## Time complexity: $O(3 \cdot 81)$ 
