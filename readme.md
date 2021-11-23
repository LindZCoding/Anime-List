1. Title: Animoots
   
2. Deployed: https://animoots.herokuapp.com/
   
3. Description:
   * Users can search for any anime or character and a list will render on the page. The user can then click on one of the options and a page will render with information on that specific anime or character. The user will then be able to add an anime or character to their list of favorites or add an anime to their plan to watch list that will display on their profile. Users will also be able to delete an anime or character from their list.
   
4. Tech stack: Javascript, PostgreSQL, Sequelize, Express, Node, EJS
   
5. Wireframe: ![animeList](https://user-images.githubusercontent.com/91760331/141506170-654626cd-ef26-41a9-9fae-126d5a9e5e50.png)
   
6. Using MyAnimeList API:
   * Example of calling API using axios: axios.get("https://api.jikan.moe/v3/anime")
   
7. ERD: ![ERDfinishedAnime](https://user-images.githubusercontent.com/91760331/141527822-bec38950-7e02-4e60-bcfb-1ec4d455ce2d.png)
    

8. MVP goals:
   * Have users be able to create their profile with their unique username and password
   * Users will be able to view a list of animes
   * Users will be able to view a list of characters
   * Users will be able to click on an anime title that will then display the name, description, icon and have a button to add that specfic anime to their favorites
   * Users will be able to favorite characters
   * Users can view their own profile and see their list of favorite animes and characters
   
9.  Stretch goals:
   * Have users be able to add each other to a friends list 
   * Make another table for characters for when a user is on a specific anime page it also shows the characters in the anime
   * Users can click on the character that will then display the voice actor for that character and show what other anime's they have voice acted for
   * Add a feature where users have a list on their page of all the anime's they have watched and can rank each anime from 1-10




