## Google Books API CLI Search Tool

// image here

### Description 

### Functionality

This application should allow you to:
- Type in a query and display a list of 5 books matching that query.
- Each item in the list should include the book's author, title, and publishing company.
- A user should be able to select a book from the five displayed to save to a “Reading List”
- View a “Reading List” with all the books the user has selected from their queries -- this is a local reading list and not tied to Google Books’s account features.


#### Install and Run

Install 
>`npm i`

Create ability to run program (Shell Command) by typing `bookfinder` in command line from any directory.

>`npm link`


#### Uninstall

Remove ability to run program by typing `bookfinder` in command line from any directory.
>`npm unlink`

### Run Program

>`bookfinder`

### Technologies Used

- [Inquirer](https://www.npmjs.com/package/inquirer)
- [Axios](https://www.npmjs.com/package/axios)
- Chalk (next iteration)
- JSON

### Developer Notes
- Storage - Since the amount of data to save was not that much and that another developer would be testing my code, I chose to save data to JSON file. There was no need to go through the extra steps of creating a db.
- TODO (next iteration)
  - Styling
    - Color some answers to be consistent with the Inquirer answers output
    - Notices should be different color from output (reading list, etc)
    - Add white space to some areas so things do not seem so cramped and for ease of reading
  - Improve README



