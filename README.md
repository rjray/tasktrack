# tasktrack

My Coursera capstone project for the Responsive Website Development and Design
specialization.

## Description

This is an enhanced task-tracking application. It features assigning tasks to
other users, sub-tasks, tracking progress, etc., as well as the basic features.

This project utilizes:

* [Meteor](https://www.meteor.com/)
* [React.js](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)

Other JavaScript packages are utilized as well; see the `package.json` file
for the top-level dependencies.

## Running

After either cloning the project or downloading and dissolving an archive of
it, run the following commands (in the project directory):

```bash
$ meteor npm install
$ meteor
```

This will start the application on port 3000.

## Further Work

This project was submitted for final evaluation on 7/6/2020, and will
(probably) not see any additional work. I will keep the GitHub project,
however, for future reference. There are some things I managed to do in the
project that may prove useful in the future.

## Dissatisfaction

(The following is an update of what I wrote originally on April 10, 2020.
Almost nothing has changed since then, I am only updating dates and adding a
little bit of new information.)

Unfortuantely, at the time of this writing (May 23, 2020), I (still) cannot
recommend this specialization in any good faith. The coursework is several
years old, and refers to specific packages (Bootstrap, Mongoose, etc.) that
have had major releases since then. While some effort is made to handle the
Mongoose conflicts, there are several places in the quizzes, end-of-week
graded tests, etc., that have misleading answers or information. In at least
one place, I found a completely wrong answer on an end-of-week test.

My particular complaint stems from asking at the very start of the Capstone
class, whether I needed to specifically use the same Meteor/MongoDB stack
(as had been used in the previous classes of the specialization) or if I could
use a different stack that was better-suited to my chosen project. I never got
an answer, so I forged ahead with React, Express and SQLite. In the fifth week
of the capstone class, there was finally a (passing) reference to your project
being structured around Meteor and MongoDB. This put me in a quandry, since I
had over four weeks of effort already invested at that point.

I contacted customer support at Coursera, and found their answers to be even
more disappointing. Their position seems to be that they do not control the
level of engagement that instructors and "mentors" have in a given class, and
that for questions I should rely on the forums and answers/input from other
students.

Thing is, I _had_ posted my question to the forum, and gotten no answer from
anyone. I had also noticed that the peer-grading in the previous five classes
had been suffering from having just a small number of people currently enrolled
in each given class. So, relying entirely on the students to drive the classes
doesn't seem to be a very effective strategy.

The feeling I get from my interaction with Coursera's customer support, is that
they see themselves as just hosting the content. Not responsible for keeping
the classes themselves running smoothly. This may be the case, but the payment
for these classes is going to them (in my case payment is made by my company,
but as far as I know it is going directly to Coursera). I don't know what part
goes to the instructors versus being kept by Coursera.

And then there is the content of the courses themselves...

This series of classes is meant to teach you the principles of responsive web
design and development. I don't feel like it really does that. Rather, it
teaches you how to use Meteor and Bootstrap to create web content that
_happens to be_ responsive. The actual coverage of HTML and CSS is very
bare-bones, and there is no discussion at all of what makes CSS responsive.
I don't remember there being _any_ discussion of media queries or similar.
Rather, their approach to responsive design is summed up as, "use Bootstrap".
To be fair, the instructors do point out that Meteor is not the only framework
out there, and likewise Bootstrap is not the only UI component library. But
since you aren't given any grounding in what makes something work in a
responsive manner, you're on your own to find alternatives.

As for me, as I write this I am preparing to re-enter the Capstone class in an
effort to finish the specialization. I have decided to abandon the previous
project I had planned, as it really needed a relational database rather than a
NoSQL approach. But I have learned, through a more-thorough reading of the
Meteor website, that I can use React with Meteor. So for my project I'll be
making use of React for the UI (along with Bootstrap v4) while still utilizing
MongoDB and Meteor. This should allow me to be able to submit a project that
will be gradable by the other students. During the first go-around of the
course, I had considered writing a wrapper for my SQL-based project and
submitting that. As long as the person evaluating the project can just run a
single command, it should be fine. But I would have had to account for users
being on any of Windows, MacOS, etc., which would limit the choice of
scripting solution for the launcher. This way is better, as it will be less of
a burden on the other participants in the class.
