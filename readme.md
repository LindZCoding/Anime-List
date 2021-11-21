1. Unnamed anime list
   
 1. Tech stack: Javascript, PostgreSQL, Sequelize, Express, Node, EJS
   
2. Wireframe: ![animeList](https://user-images.githubusercontent.com/91760331/141506170-654626cd-ef26-41a9-9fae-126d5a9e5e50.png)
   
3. MyAnimeList API
   
4. ERD: ![ERDfinishedAnime](https://user-images.githubusercontent.com/91760331/141527822-bec38950-7e02-4e60-bcfb-1ec4d455ce2d.png)
    
5. Example of how to call/invoke your API, and a description of what data comes back. 
   app.get('/:location', (req, res) => {
let animeUrl = 'https://api.myanimelist.net/v2';
}

* curl 'https://api.myanimelist.net/v0.20/anime/

Will have it call back anime titles, description, icons, etc.

7. MVP goals (x3-5)
   * Have users be able to create their profile with their unique username and password
   * Users will be able to view a list of anime's
   * Users will be able to view a list of characters
   * Users will be able to click on an anime title that will then display the name, description, icon and have a button to add that specfic anime to their favorites
   * Users will be able to favorite characters
   * Users can view their own and other users profiles to see a list of their favorite anime's
   
8. Stretch goals (x2-5)
   * Have users be able to add each other to a friends list 
   * Make another table for characters for when a user is on a specific anime page it also shows the characters in the anime
   * Users can click on the character that will then display the voice actor for that character and show what other anime's they have voice acted for
   * Add a feature where users have a list on their page of all the anime's they have watched and can rank each anime from 1-10




