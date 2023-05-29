# [Question](https://leetcode.com/problems/car-fleet/)
Difficulty: Medium
# Goal
The question boils down to the following  

given an array $a$, find all the series(or the number of them) $a[i], a[i+1], a[i+2].... a[j]$ such that  
$1)$ $a[i] = max( a[i+1], a[i+2], a[i+3].... a[j])$    
$2)$ $a[j+1] > a[i]$

how does it boil down to it.Let's look at the solution

# Solution
## trick
Map the (target - position) and speed and then sort this map in ascending order (convert to vector of pairs, sort()). Now find times using distance/speed and then the task of finding number of fleets boils down the question given above.
##

## code
### cpp
```
class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        vector<double> timeTakenVec = createTimeTakenVec(target, position, speed); //data manipulation

        int numFleets = 0;
        double maxTimeTaken = 0;
        for (int i = 0; i < timeTakenVec.size(); i++){
            if (timeTakenVec[i] > maxTimeTaken){
                maxTimeTaken = timeTakenVec[i];
                numFleets++;
            }
        }
        return numFleets;
    }

    map<int, int> mapPositionToSpeed(int &target, vector<int>& position, vector<int>& speed){
        map<int, int> posToSpeed;
        for (int i = 0; i < position.size(); i++){
            posToSpeed[target - position[i]] = speed[i];
        }
        return posToSpeed;
    }
    vector<pair<int, int>> mapToVec(map<int, int> &posToSpeed){
        vector<pair<int, int>> posSpeedVec;
        for (auto it = posToSpeed.begin(); it != posToSpeed.end(); it++){
            posSpeedVec.push_back(make_pair(it->first, it->second));
        }
        return posSpeedVec;
    }
    vector<double> createTimeTakenVec(int &target, vector<int> &position, vector<int> &speed){
        map<int, int> posToSpeed = mapPositionToSpeed(target, position, speed);

        vector<pair<int, int>> posSpeedVec = mapToVec(posToSpeed);

        sort(posSpeedVec.begin(), posSpeedVec.end(), [](pair<int, int> &p1, pair<int, int> &p2){
            return p1.first < p2.first;
        });

        vector<double> timeTakenVec;
        for (int i = 0; i < posSpeedVec.size(); i++){
            timeTakenVec.push_back((double)posSpeedVec[i].first /posSpeedVec[i].second);
        }
        return timeTakenVec;
    }
};
```
i just wanna add in python code to show just how simple it is. Just pure elegance.
### python
```
def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
    stack = []
    for pos, vel in sorted(zip(position, speed))[::-1]:
        dist = target - pos
        if not stack:
            stack.append(dist / vel)
        elif dist / vel > stack[-1]:
            stack.append(dist / vel)
    return len(stack)
```
comment - the elegance is due to sorted(zip(position, speed)) which combines position and speed Lists into a map and then sorts it. I have to make functions for this in cpp.

# Time complexity : $O(nlogn)$
Sorting takes $O(nlogn)$ , otherwise finding number of fleets is $O(n)$. There is a way to optimize time to $O(n)$ but it has space complexity of $O(target)$
