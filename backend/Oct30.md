1. C++ initialize a n vector<int> of vector

	```c++
		
		vector<vector<int>> graph(n, vector<int>());
	
	```

2. Minimum Height Trees
	Algorithm: 
	这道题可以用拓扑排序的思想来做，虽然不是有序图， 我们的目标是找到那个根节点。

	- 创建图
	- 统计每个节点的入度
	- 把所有入度为1的节点放入queue （叶子节点）
	- 从每个叶子节点找到他们各自的根节点，把他们的入度减一
	- 当根节点入度为1时， 放入queue
	
   最后的一组queue就是最后的根节点， 也就是答案。
   
3. Word ladder
   - Algorithm: 
   
   - Explanation: 
   
   Well, this problem has a nice BFS structure. 
	
	Let's see the example in the problem statement.
	
	`start = "hit"`
	
	`end = "cog"`
	
	`dict = ["hot", "dot", "dog", "lot", "log"]`
	
	Since only one letter can be changed at a time, if we start from `"hit`", we can only change to those words which have only one different letter from it, like `"hot"`. Putting in graph-theoretic terms, we can say that `"hot"` is a neighbor of `"hit"`.
	
	The idea is simpy to begin from start, then visit its neighbors, then the non-visited neighbors of its neighbors... Well, this is just the typical BFS structure.
	
	To simplify the problem, we insert `end` into dict. Once we meet `end` during the BFS, we know we have found the answer. We maintain a variable `dist` for the current distance of the transformation and update it by `dist++` after we finish a round of BFS search (note that it should fit the definition of the distance in the problem statement). Also, to avoid visiting a word for more than once, we erase it from dict once it is visited.
	
4. Word Ladder II 
	- Description: Return all the possible shortest paths from `beginWord` to `endWord`, the words on the paths are all in the word list `wordList`
	- Idea: BFS of vector<string> The only tricky thing you need to remember is this is a BFS of paths not words!
So the element is the queue is a vector. That's it.
	- Code
	
	```c++
	class Solution {
	public:
	    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
	        vector<vector<string>> ans;
	        
	        unordered_set<string> wordDict;
	        for (string word: wordList) {
	        	wordDict.insert(word);
	        }
	        
	        queue<vector<string>> q;
	        unordered_set<string> visited;
	        
	        q.push({beginWord});
	        visited.insert(beginWord);
	        
	        int minLevel = INT_MAX;
	        int level = 1;
	        
	        
	        // "visited" records all the visited nodes on this level
            // these words will never be visited again after this level 
            // and should be removed from wordList. This is guaranteed
            // by the shortest path.
	        while(!q.empty()) {
	           vector<string> path = q.front(); q.pop();
	        	 if (path.size() > level) {
	        	 	for (string word: visited) {
	        	 		wordDict.erase(word);
	        	 	}
	        	 	visited.clear();
	        	 	if (path.size() > minLevel) {
	        	 		break;
	        	 	} else {
	        	 		level = path.size();
	        	 	}
	        	 }
	        	 string last = path.back();
	        	 for (int i = 0; i < last.length(); ++i) {
	        	 	string news = last;
	        	 	for (char c = 'a'; c <= 'z'; ++c) {
	        	 	  news[i] = c;
	        	 	  if (wordDict.find(news) != wordDict.end()) {
	        	 	     vector<string> copy = path;
	        	 	     copy.push_back(news);
	        	 	     visited.insert(news);					     
	        	 	     if (news == endWord) {
	        	 	     	ans.push_back(copy);
	        	 	     	minLevel = level;
	        	 	     } else {
	        	 	     	q.push(copy);
	        	 	     }
	        	 	  }
	        	 	}
	        	 }
	        }
	        return ans;
	    }
	};
	```