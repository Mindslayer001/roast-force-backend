# Api to call

## user.info
### Api Format
```https://codeforces.com/api/user.info?handles=${userName}&checkHistoricHandles=false```

### Response Format

```
{
  "status": "OK",
  "result": [
    {
      "lastName": "Khodyrev",
      "lastOnlineTimeSeconds": 1742481459,
      "rating": 1709,
      "friendOfCount": 95,
      "titlePhoto": "https://userpic.codeforces.org/1592/title/27e43714e4bea090.jpg",
      "handle": "DmitriyH",
      "firstName": "Dmitriy",
      "contribution": 0,
      "organization": "",
      "rank": "expert",
      "maxRating": 2072,
      "registrationTimeSeconds": 1268570311,
      "maxRank": "candidate master"
    }
  ]
}
```

### Error

```{"status":"FAILED","comment":"handles: User with handle a not found"}```