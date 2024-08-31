class Solution {
public:
    vector<string> topKFrequent(vector<string>& words, int k) 
    {
      unordered_map<string, int> m;

      for(auto& s: words)
        m[s]++;

      map<int, vector<string>> m2;

      for(auto& [k, v]: m)
        m2[v].push_back(k);

      vector<pair<int, vector<string>>> v;

      for(auto& [k, val]: m2)
        v.push_back({k, val});

      for(auto& p: v)
        sort(p.second.begin(), p.second.end());

      print(v);

      vector<string> res;
      for(int i = v.size() - 1; i > -1 and res.size() < k; i--)
      {
        for(auto& s: v[i].second)
        {
          cout << s << '\n';
          if(res.size() < k) res.push_back(s);
        }
      }

      return res;
    }
    void print(auto& v)
    {
      for(auto& p: v)
      {
        cout << p.first << " ";
        for(auto& s: p.second)
          cout << s << " ";

        cout << '\n';
      }
      return;
    }
};