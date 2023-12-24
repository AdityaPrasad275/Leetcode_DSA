# [Question](https://leetcode.com/problems/design-twitter/)
Difficulty: Medium
# Goal
Design twitter lol. A simplistic version of twitter, where you(and other people) can post tweets, follow people, and see the latest 10 tweets from people you follow (including your own tweets).

<details>
<summary> The nitty gritty details </summary>

<p>Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the <code>10</code> most recent tweets in the user's news feed.</p>

<p>Implement the <code>Twitter</code> class:</p>

<ul>
	<li><code>Twitter()</code> Initializes your twitter object.</li>
	<li><code>void postTweet(int userId, int tweetId)</code> Composes a new tweet with ID <code>tweetId</code> by the user <code>userId</code>. Each call to this function will be made with a unique <code>tweetId</code>.</li>
	<li><code>List&lt;Integer&gt; getNewsFeed(int userId)</code> Retrieves the <code>10</code> most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be <strong>ordered from most recent to least recent</strong>.</li>
	<li><code>void follow(int followerId, int followeeId)</code> The user with ID <code>followerId</code> started following the user with ID <code>followeeId</code>.</li>
	<li><code>void unfollow(int followerId, int followeeId)</code> The user with ID <code>followerId</code> started unfollowing the user with ID <code>followeeId</code>.</li>
</ul>

</details>

# Solution
## Trick
One way is to work with a tweet struct which has tweetId, userId, and timestamp as it's properties/method. Then we can use a priority queue to store the tweets, and sort them by timestamp. Then we can just pop the top 10 tweets from the priority queue. 

Another way to forget struct and stuff and just work with a hashmap<int , vector<pair<int, int>>> where the key is the userId, and the value is a vector of pairs of tweetId and timestamp. 

But i did using struct so i'll go forward with that. The struct (tweet) contains in itself the tweetId, userId, and timestamp.

For followers and stuff, maintain a hashmap mapping userId to vector of userIds that they follow.

For tweets, maintain a hashmap mapping userId to vector of tweets. When posting a tweet, we push the tweet into the vector of tweets that the user has.
Remember, the tweet struct has a time property, which is just a counter that increments everytime a tweet is posted. This is used to sort the tweets in the priority queue.

When constructing the feed, we can just iterate through the vector of userIds that the user follows, and then iterate through the vector of tweets that each of those users have, and then push them into the priority queue (min heap). We only push so much that the size remains 10.

Now due to the fact that we have a min heap, we have to reverse the vector resulting from popping. Instead of going this route, we can use deque!

Comment - I got confused at first and used maxHeap as i thought that would store the 10 most recent tweets, but that's not the case. This is because when we are constructing feed, we want to remove the oldest tweet from the feed, and add the newest tweet. So we need to remove the oldest tweet from the feed, which is the top of the heap. So we need a min heap.
## Code
```cpp
class Twitter {
private:
    struct tweet 
    {
        int tweetId;
        int userId;
        int time;

        tweet(int x, int y, int t) : tweetId(x), userId(y), time(t) {}
        tweet() : tweetId(0), userId(0), time(0) {};
    };

    int time = 0;
    unordered_map<int, vector<tweet>> tweets;
    unordered_map<int, unordered_set<int>> following;

    struct compare 
    {
        bool operator()(tweet& a, tweet& b) {
            return a.time > b.time;
        }
    };

public:
    Twitter() {}

    void postTweet(int userId, int tweetId) 
    {
        time++;
        tweets[userId].push_back(tweet(tweetId, userId, time));
    }

    vector<int> getNewsFeed(int userId) 
    {
        priority_queue<tweet, vector<tweet>, compare> feed;

        auto& temp = following[userId];

        if (temp.find(userId) == temp.end())
            temp.insert(userId);
        
        int size = 10, counter = 0;

        for (auto& f : temp) 
        {
            for (auto& t : tweets[f]) 
            {
                if (counter < size)
                    feed.push(t);
                else 
                {
                    if (t.time > feed.top().time) {
                        feed.pop();
                        feed.push(t);
                    }
                }
                counter++;
            }
        }

        deque<int> res;

        while (!feed.empty()) 
        {
            res.push_front(feed.top().tweetId);
            feed.pop();
        }

        return vector<int>(res.begin(), res.end());
    }

    void follow(int followerId, int followeeId) 
    {
        auto& temp = following[followerId];
        temp.insert(followeeId);
    }

    void unfollow(int followerId, int followeeId) 
    {
        auto& temp = following[followerId];
        temp.erase(followeeId);
    }
};
```
## Time Complexity: 

Let's go function by function:

postTweet: $O(1)$ - We are just pushing a tweet into a vector.

getNewsFeed: $O(n\cdot log(10))$ - Where n is total number of tweets that the user has posted and the poeple who he's following have posted.

follow: $O(1)$ - We are just inserting into a unordered_set.

unfollow: $O(1)$ - We are just erasing from a unordered_set.