# Git Conventions

This convention serves as a guide for best practices, emphasizing on readability and maintainability.

## Commit Message Prefixes

1. `build`: Changes that affect the build system or external dependencies (example: updating a dependency, fixing a build script)
2. `chore`: Changes that do not modify the code itself (example: updating documentation, fixing the codebase layout, updating dependencies)
3. `ci`: Changes to the CI (continuous integration) configuration or scripts (example: adding or removing a test, updating a build step)
4. `docs`: Changes to documentation (example: adding or updating documentation, fixing typos)
5. `feat`: New features (example: adding a new button, adding a new feature to the user interface)
6. `fix`: Bug fixes (example: fixing a crash, fixing a typo)
7. `perf`: Performance improvements (example: optimizing algorithms, reducing memory usage)
8. `refactor`: Changes that improve the structure, readability, or maintainability of the code without changing its functionality (example: renaming variables, extracting functions)
9. `revert`: Resets a previous commit (example: reverting a change that introduced a bug)
10. `style`: Changes that do not affect the meaning of the code (example: adding or removing whitespace, changing the formatting of comments)
11. `test`: Adds or improves tests (example: adding a new test case, fixing a failing test)

## Don'ts

1. Never overwrite an existing commit. Always create a new one, even if it is to revert to a previous commit. This helps to keep track of the different changes.
