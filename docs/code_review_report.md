# Code Review - Iteration 5

## Design:
- - Backend code can be improved so that each segment only contains one route and each route only contains a single connection to the database and a few methods we're long they were taken care of by mostly Epiphany, James, and Xiao, making the messy backend we had before much simpler to read and decipher for others
- Sentiment analyzer class could utilize an interface (dependency inversion principle)
- A few methods are long and need refactoring

## Complexity:
- A few occurences where async await would make the code more readable
- Refactored the voting routes to use async await and try catch instead of the parallel async (Epiphany)

## Tests:
- The code needs more automated tests (Elmi)

## Naming:
- Naming is satisfactory

## Comments:
- Could utilize more comments to clarify what important parts of the code are doing (Everyone)
- A few occurrences of commented unused code (Everyone)
- Reduce unnecessary console.log statements (Everyone)

## Style:
- Unused classes/folders: sentiment folder, original CourseSearch.js file, original HomePage.js file (Everyone)
- Multiple unused imports, methods, and variables (Everyone)
- Inconsistent indentation, could make code more readable  (Everyone)
- Cleaned up the code and removed redundant files  (Everyone)

## Documentation:
- Documentation is satisfactory

