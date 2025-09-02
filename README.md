Aptitude Test Website
An online aptitude testing platform built with React (frontend) and Node.js + Express + MongoDB (backend).
The platform provides a complete test-taking experience for students and monitoring tools for admins.

✨ Features
                            👨‍🎓 Student Portal
* Login & Registration: Students can register by providing personal details (name, email, college, CGPA, etc.).
* Form Validation: Mandatory details collected and stored securely in MongoDB.
* Terms & Conditions: Students must accept terms before starting the test.
*Aptitude Test:
        1.50 total questions (90 minutes):
             20 Mathematics
             20 Reasoning
             10 English
*Each question has 4 options (only one correct).
Students can:
         * Answer a question
         * Skip a question
         * Mark as Flagged
         * Flag + Answer
Minimum 47 questions must be attempted to submit (max 3 skips allowed).
Review Page: After completing, students see all 50 questions with their status (answered, skipped, flagged, etc.).
Result Page:   Displays Total Score + Section-wise Score
        *  +4 / -2 marking system
Review Mode: Students can re-check questions:
Correct answers highlighted in green if answered wrong

                            👩‍💻 Admin Portal

*Admin login with secure authentication.
*Dashboard to track:
*Student details (name, email, college, CGPA)
*Test score (total + section-wise)
*Exam date and time taken
*Submission details

--***Tech Stack***--
*Frontend (React)
*React.js
*React Router DOM
*Backend (Node.js + Express)
*Express.js
*BcryptJS (password hashing)
*CORS
*Mongoose (students, test details, admin data)


📜 Test Rules
*Duration: 90 minutes
*Total Questions: 50
*Marking System: +4 for correct, -2 for wrong
*Minimum Attempt: 47 questions (max 3 skips allowed)
*Modes: Answer, Skip, Flag, Flag + Answer
