# Code Review - Iteration 5

## Design:
- Backend code can be improved so that each segment only contains one route and each route only contains a single connection to the database
- Sentiment analyzer class could utilize an interface (dependency inversion principle)
- A few methods are long and need refactoring
- Refactored the voting routes to use async await and try catch instead of the parallel async

## Complexity:
- 

## Tests:
- The code needs more automated tests

## Naming:
- Naming is satisfactory

## Comments:
- Could utilize more comments to clarify what important parts of the code are doing
- A few occurrences of commented unused code
- Reduce unnecessary console.log statements

## Style:
- A few occurences where async await would make the code more readable
- Unused classes/folders: sentiment folder, original CourseSearch.js file
- Multiple unused imports, methods, and variables
- Inconsistent indentation, could make code more readable
- Cleaned up the code and removed redundant files 

## Documentation:
- Documentation is satisfactory

