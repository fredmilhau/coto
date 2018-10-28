# TODO

add scripts:  
```
"prepare": "npm run build",
"prepublishOnly": "npm run test && npm run lint",
"preversion": "npm run flint && npm test",
"version": "git add -A src && git add -A __tests__",
"postversion": "git push && git push --tags"
```