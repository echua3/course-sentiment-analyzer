# Code Review - Iteration 5

## Design:
- Backend code can be improved so that each segment only contains one route and each route only contains a single connection to the database and a few methods we're long they were taken care of by mostly Epiphany, James, and Xiao, making the messy backend we had before much simpler to read and decipher for others
- Sentiment analyzer class could utilize an interface (dependency inversion principle)
- A few methods are long and need refactoring

## Complexity:
- A few occurences where async await would make the code more readable
- Refactored the voting routes to use async await and try catch instead of the parallel async (Epiphany)
- Changed the complexity from the common try statements we used back during the inital tests with the backend, to awaits to lower down the complexity and allow more verstalitiy when it comes to making changes to the database, this was handled majorly by Epiphany, James, and Xiao, minorly by Elmi

## Tests:
- Established a bench marker to test concurrency of the database, from now on, allowing us to debug the issues that came up with the concurrency of the async parallel statements, this was handled majorly by Elmi

## Naming:
- Naming doesn't need any specific changes, everything is as descriptive as it can be, along with routes, and resulting values

## Comments:
- Could utilize more comments to clarify what important parts of the code are doing (Everyone)
- A few occurrences of commented unused code (Everyone)
- Reduce unnecessary console.log statements (Everyone)
- Removed unused comments of code, and added small little changes to the comment structure here and there mostly to the backend, as well as removing pesky console.log values

## Style:
- Unused classes/folders: sentiment folder, original CourseSearch.js file, original HomePage.js file (Everyone)
- Multiple unused imports, methods, and variables (Everyone)
- Inconsistent indentation, could make code more readable  (Everyone)
- Cleaned up the code and removed redundant files  (Everyone)
- Removed unused directories, imports, lines, files, anything that wasn't actively being under use, in the corresponding program, also cleaned up indentation, schema, brackets, and overall stylistic choices

## Documentation:
- Documentation is satisfactory and doesn't need any specified changes to it from our current iteration

