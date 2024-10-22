# Lamda functions in sorting
"return true if the first value should come before the second value, else false"
```cpp
sort(intervals.begin(),  intervals.end(), [](vector<int> a, vector<int> b){
  return a[1] < b[1];
});
```
so < means sort in increasing order while > means sort in decreasing order

# optimizing
```cpp
#pragma GCC optimize("Ofast","inline","fast-math","unroll-loops","no-stack-protector")
#pragma GCC target("sse,sse2,sse3,ssse3,sse4,popcnt,abm,mmx,avx,avx2,tune=native","f16c")
static const auto fast = []() {ios_base::sync_with_stdio(false); cin.tie(0); cout.tie(0); return 0; } ();
```