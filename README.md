![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)
# GA WDI-32 Project - Shwap

What can cause a lot of issues within the workplace, especially ones that rely on shifts, is the admin behind it; organising shifts, employees having a place to see when they're working and if employees need to change shifts everyone who needs to be involved knows.

I decided to make an in-house web-app for a business that enables employers to create shifts for their employees and for somewhere where the employees can see their shifts and request to make changes if they need to. All in one location.

Shwap is a MERN stack application which implements WebSockets for the live draft client, JWT/bcrypt authentication. The app is tested with mocha, chai and enzyme.

[Visit Website](https://shwap-project.herokuapp.com/)

*Please be aware that Heroku apps go to sleep after 30 mins of inactivity and may take a little time to load*

*If you wish to sign in as the manager the details are: jeff-smith@jeff.com and the password is: password*

---

<p align="center"><img src="https://i.imgur.com/29Fvh7N.png" width="700"></p>

###### For my initial planning, I spent a lot of time thinking about what would constitute my MVP. I wanted to create something simple to use and a product that makes life easier for those in charge of shift management. Initially the MVP was two employees able to swap shifts with one another. This then developed into an employer having to approve the shift swap.

<p align="center"><img src="https://i.imgur.com/gMwhAd2.png" width="700"></p>
<p align="center"><img src="https://i.imgur.com/a3K2VTH.png" width="700"></p>

###### As an employee you're able to see when your shifts are and are able to swap it with someone else. As an employer you are able to accept or decline those requests, create new shifts and register new employees. If an employer tries to access the pages only an employer has access to they can only see a message stating that they don't have access to that page.

<p align="center"><img src="https://i.imgur.com/cWfxUOM.png" width="700"></p>
<p align="center"><img src="https://i.imgur.com/4jh13M1.png" width="700"></p>

###### Implementing the logic behind shift swapping was a struggle at first. I realised that I had to create another model for requests which consisted of two users and two requests. Ultimately I'd be swapping the user id for each shift.

---

Shwap was the most complex development project I have tackled to date and I am delighted with what I was able to achieve.

I plan to rebuild this app in React Native in order to get some experience with this technology, however, things I would love to work on with Shwap include:
- Send text notifications once the shift has been swapped to all parties involved
- Have the employee approve the shift request before the employer
- Have the employer be able to create multiple shifts at once
