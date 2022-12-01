# Design:
- Backend code can be improved so that each segment only contains one routes and each route only contains a single connection to the database
- Sentiment analyzer class could utilize an interface (dependency inversion principle)
- A few methods are long and need refactoring

# Complexity:
- 

# Tests:
- The code needs more automated tests

# Naming:
- Naming is satisfactory

# Comments:
- Could utilize more comments to clarify what important parts of the code are doing
- A few occurrences of commented unused code
- Reduce unnecsarry console.log statements

# Style:
- A few occurences of ".method().method().method()" in the backend routes
- Unused classes/folders: sentiment folder, original CourseSearch.js file
- Multiple unused imports, methods, and variables
- Inconsistent indentation, could make code more readable

# Documentation:
- Documentation is satisfactory
