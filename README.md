This is Advanced Internet programming assignment3
-

It is a website which only can post and disscused by pictures. It uses Angular+NodeJS+Mongodb
-

Developer:
Quan Zhu  13073857
Yuhui Liu   12842201
Huiyun Niu  13320445

Team:
Strawberry

Git repository:
https://github.com/zhudtq/AIP-ass3

1.Angular

npm install -g @angular/cli

2.Mongodb

npm install mongoose

3. express

npm install express --save

4. node.js

https://nodejs.org/en/download/

How to start?
-
1. in command line 
    cd hotDiscussion-Angular
    npm install
    ng serve
    // to start angular client

2. install mongodb server on your pc and run following command to open up database
    start D:\EFolder\mangodb\mongodb\bin/mongod.exe --dbpath=D:\EFolder\mangodb\mongodb-data 
    // use your mongodb path

3. in command line 
    cd hotDiscussion-Nodejs
    npm install
    npm run dev
    // to start backend (before run npm run dev , make sure you successfully open up the database which is the 2nd option)



Design Principle:
-
Key principles of code style and design:
-

1.We implement layered structure to the application with good documentation. Files are nested in proper folders to make it easier to manage and maintain as the project grows.

2.We add sufficient but not tedious comments to the code which gives a clue to developers and others who read the code. The comments should not be overwhelming or impede reading the code.

3.We use component and module of Angular to organize difference components or features in the app. The process is to structure the skeleton of the app and then add on detailed components. This makes components reusable and the app scalable during the evolution of system.

4.We import libraries only where appropriate and necessary, and avoid leaving unused libraries which makes the document redundant.

5.We use CSS styling elegantly with a defined design standard, and the style is uniform and consistent across the application. 

API and database design principle:

6. API single responsibility principle. Every function and model should be responsible for a single part of the
functionality that to be completed.

7. API file high scalability principle. New API would be easy to added to exsiting files without any change. The whole
API would be easy to extend.

8. API high readability principle. Add comment to necessary functions and statement that maintainer could easily understand 
what thoses function means.

9. Backend file separation principle. Split files into different directory according to its functinality and feature, such as 
middle, router and model directory. 

10. Database ODM one to one principle. Every of mongodb collections should be ressponding to a single mongoose model. Inside that model,
limitation, validation and basic configuration should be required.

Principles that will be applied to improve our code style in iteration:

11.LIFT principle: Locating our code is easy, Identify code at a glance, Flat structure as long as we can, Try to stay DRY(don't repeat yourself).This method can help us with the readability and helps us to work on the correct file efficiently.

12. Organization for readability
    The most important stuff goes first.
    Properties followed by methods.
    Grouped and sorted.
    Consistent naming and spelling matter.


13. Provide clarity through code first. Comment principles:

    Self-describing code
    Replace magic strings with constants (code reuse)
    Explain in code, not in comments
    Comments must be readable and maintained

    Avoid comments when:
    → Explains “What” the code does.
    → Outdated and incorrect (wrong comments are worse than no comments).
    → Instead, have a well-named function.
    → THE CODE NEVER LIES, COMMENTS SOMETIMES DO.

    Use comments when:
    → Explain “Why” you do that.
    → Explaining consequences.
    → API Docs.

14. separate files and functions
    One item per file
      One file must have only one component and the same is valid for services or directives.
    Single Principle Responsibility
      Single class or module should only have a single responsibility.
    Small Functions
      Small functions are better to read and faster to understand the purpose.

15.Meaningful Names
    It’s very important that you give good names to methods, variables, and parameters.
