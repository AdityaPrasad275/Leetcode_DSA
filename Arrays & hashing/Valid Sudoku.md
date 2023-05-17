# Difficulty: Medium
# Goal
## trick
Check if given sudoku is valid or nah, which involves three steps:  
1) check every row for unique 1-9  
2) check every column for uniqueness
3) check every 3x3 cell for uniqueness  
Use unordered set
## code
```
class Solution {
public:
    bool isValidSudoku(std::vector<std::vector<char>>& board) {
    // check rows
    for (int i = 0; i < 9; i++) {
        std::unordered_set<char> seen;
        for (int j = 0; j < 9; j++) {
            char c = board[i][j];
            if (c != '.') {
                if (seen.count(c)) return false;
                seen.insert(c);
            }
        }
    }

    // check columns
    for (int j = 0; j < 9; j++) {
        std::unordered_set<char> seen;
        for (int i = 0; i < 9; i++) {
            char c = board[i][j];
            if (c != '.') {
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
    for (int k = 0; k < 9; k++) {
        std::unordered_set<char> seen;
        for (int i = k/3*3; i < k/3*3+3; i++) {
            for (int j = k%3*3; j < k%3*3+3; j++) {
                char c = board[i][j];
                if (c != '.') {
                    if (seen.count(c)) return false;
                    seen.insert(c);
                }
            }
        }
    }

    return true;
}
};
```

## Time complexity: O(3 * 81) 
