# Intensive Medium Blog clone with React

## Description

This project is a clone of the Medium blog website. It is a full-stack project that uses React for the front-end and Node.js for the back-end. The project is a single-page application that allows users to to many features e.g (read articles, create articles, and follow other users, etc...). The project uses a RESTful API to communicate between the front-end and back-end.

## Technologies

- React
- Tailwind CSS
- Node.js/Express
- MongoDB
- JWT
- AWS S3

## Features

- Dark/Light Mode
- User authentication (login, register, logout) + (Register / Login with Google)
- Authorization (only authenticated users can create articles)
- Create articles
  - Add images to articles (stored in AWS S3)
  - Rich text editor (using Editor.js) -![Create Blog Page](demo/empty-blog.png)
  - ![Blog Page](demo/blog.png)
- Home page
- ![Home Page](demo/home.png)
- Search Page (User & Articles)
- ![Search Page](demo/search.png)
- Profile User (Follow, Unfollow, Edit Profile)
- ![Profile User](demo/userpage.png)
- Article Page (Like [done], Comment[almost done], Bookmark[working])
- Comment on Article
- ![Comment System](demo/comment.png)
- ![Read Article](demo/article.png)
- Edit Article
- ![Edit Article](demo/edit-article.png)
- List of articles
- Settings / Dashboard
  - Change Password
  - ![Change Password with Errors](demo/change-password.png)
  - ![Change Password with Success](demo/change-password-success-1.png)
  - Update Profile Image
  - ![Upload Profile Image](demo/upload-profile-image.png)
- Notification Page (Reply, Seen, Unssen) + Pagination
- ![alt text](demo/new-notification-1.png)
- ![alt text](demo/pagination-notification.png)
- Blogs Management (Delete, Edit, View, Stats)
- ![alt text](demo/blogs-manage.png)
- Pagination

## Some Refactors

1. Done Pagination for Comments and Show/Hide Replies [DONE]
2. Props Drilling converted to Context API or Redux [] (I will use Redux)

##### TODO

1. Replace returning whole replies for each comment with return as demand (lazy loading)
   1. when press 'load reply' button, then fetch replies from api (iam using eager loading now)
