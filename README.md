# Shelfie

A single page web application allowing a user to create a detailed summary of books they have read, and highlight favorite quotes. A user may edit any book they add to the database, as well as quotes, and save as many quotes as they wish. 

The app is built using a Rails API backend, and JavaScript, HTML, CSS, and Bootstrap for the frontend. The Rails API was created with a Postgres database.

![Screen Shot 2022-07-11 at 11 00 45 AM](https://user-images.githubusercontent.com/26771302/178295494-881c3abb-3ac6-46a3-bea1-d83b32735f8f.jpeg)

# How to use it
The backend is located here: https://github.com/cupofcake92/shelfie_backend

1. Clone both repositories to your computer.
2. CD into `shelfie_backend`.
3. Run the following commands: `bundle install`
4. Run `rake db:create` to create the databse.
5. Run `rake db:seed` to seed the database.
6. Run `rails s` to start the server.
7. Open `localhost:3000/api/v1/books` in your browser.
8. CD into `shelfie_frontend`.
9. Open the `index.html` file in your browser. Shelfie will be ready for you to use and save your favorite books. 

![Screen Shot 2022-07-11 at 11 00 58 AM](https://user-images.githubusercontent.com/26771302/178295541-3e688534-3a6d-4c94-8f85-985104457c76.jpeg)
