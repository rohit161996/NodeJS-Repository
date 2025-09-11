# 📘 Feed API & Pagination Notes

## 🎯 Objective  
The **Feed API** returns profiles of other users on the platform for discovery.  
The feed **excludes**:  
1. The logged-in user (self).  
2. Users who are already connected.  
3. Users who have ignored the logged-in user.  
4. Users who already have pending/accepted/rejected connection requests with the logged-in user.  

---

## 🧠 Example  
Rahul’s feed logic:  
- Rahul’s connections: `[ Mark✅, Donald✅, MS Dhoni✅, Virat✅, Elon✅ ]`  
- Requests:  
  - Request → Mark (❌ rejected)  
  - Request → Elon (✅ accepted)  

👉 Rahul’s feed should show: `[ Donald✅, MS Dhoni✅, Virat✅ ]`  

---

## ⚙️ API Endpoint  

```js
GET /feed?page=1&limit=10
```

### 🔹 Query Params  
- `page` → current page number (default: 1).  
- `limit` → number of results per page (default: 10, max: 50).  

---

## 🛠️ Steps Inside API  

### 1. Get logged-in user  
```js
const loggedInUser = req.user;
```

### 2. Handle pagination  
```js
const page = parseInt(req.query.page) || 1;
let limit = parseInt(req.query.limit) || 10;
limit = limit > 50 ? 50 : limit;   // Prevent abuse
const skip = (page - 1) * limit;   // Used with MongoDB .skip()
```

---

### 3. Fetch connection requests (sent or received)  
```js
const connectionRequest = await ConnectionRequest.find({
  $or: [
    { fromUserId: loggedInUser._id },
    { toUserId: loggedInUser._id }
  ],
}).select("fromUserId toUserId");
```
- `$or` ensures we capture both directions (sent & received requests).  
- Only select necessary fields to optimize performance.  

---

### 4. Create exclusion list (`hideUsersFromFeed`)  
```js
const hideUsersFromFeed = new Set();
connectionRequest.forEach(req => {
  hideUsersFromFeed.add(req.fromUserId.toString());
  hideUsersFromFeed.add(req.toUserId.toString());
});
```
- `Set` ensures **unique user IDs**.  
- This prevents duplicates in exclusion.  

---

### 5. Query users excluding these IDs  
```js
const users = await User.find({
  $and: [
    { _id: { $nin: Array.from(hideUsersFromFeed) } }, // Not in exclusion list
    { _id: { $ne: loggedInUser._id } },              // Not self
  ]
})
.select(USER_SAFE_DATA)
.skip(skip)
.limit(limit);
```

#### 🔑 MongoDB Operators Used:
- `$nin` → Exclude users whose IDs are in a given array.  
- `$ne` → Exclude a single specific user (the logged-in user).  
- `$and` → Combine multiple conditions.  

---

### 6. Return result  
```js
res.send(users);
```

---

## 📦 Pagination in MongoDB  
- `.skip(n)` → Skips `n` documents.  
- `.limit(m)` → Returns only `m` documents.  

**Examples:**  
- `/feed?page=1&limit=10` → skip(0), limit(10) → Users 1–10.  
- `/feed?page=2&limit=10` → skip(10), limit(10) → Users 11–20.  
- `/feed?page=3&limit=10` → skip(20), limit(10) → Users 21–30.  

---

## ✅ Key Takeaways  
- Use `$nin` for bulk exclusion.  
- Use `$ne` for excluding logged-in user.  
- Always paginate with `.skip()` and `.limit()`.  
- Use `Set` to ensure unique exclusions.  
- Limit maximum `limit` size to prevent performance issues.  

- The response for all the API's should be same, it should not vary accross the systems.

