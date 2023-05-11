-- Attributes: https://docs.google.com/document/d/1TCTafac-pLRDDqCdYcWdnadpWZPgMh470hrsE7rV6fc/edit?usp=sharing

--corresponds to "User"
CREATE TABLE STUDENT
(
  Name VARCHAR(20) NOT NULL,
  N_Number CHAR(9) NOT NULL,
  Image_Url VARCHAR(150),
  
  PRIMARY KEY (N_Number)
);

--corresponds to "Set"
CREATE TABLE NOTECARD_SET 
(
  N_Number CHAR(9) NOT NULL,
  Set_ID VARCHAR(30) NOT NULL,
  Set_Name VARCHAR(30) NOT NULL,
  Set_Description VARCHAR(300),
  Is_Public CHAR(1) DEFAULT ('F'),

  PRIMARY KEY (Set_ID),
  FOREIGN KEY (N_Number) REFERENCES STUDENT (N_Number)
);

--corresponds to "Notecard"
CREATE TABLE NOTECARD
(
	Set_ID VARCHAR(30) NOT NULL, --notecard is in a set
	Notecard_ID VARCHAR(30) NOT NULL,
	Question VARCHAR(100) NOT NULL,
	Answer VARCHAR(300) NOT NULL,

	
	PRIMARY KEY(Notecard_ID, Set_ID), 
	FOREIGN KEY (Set_ID) REFERENCES NOTECARD_SET(Set_ID)
);

--corresponds to "View"
CREATE TABLE VIEW_SET 
(
  Favorite CHAR(1) DEFAULT ('F'),
  User_ID CHAR(9) NOT NULL,
  Set_ID VARCHAR(30) NOT NULL,

  PRIMARY KEY(User_ID, Set_ID),
  FOREIGN KEY (User_ID) REFERENCES STUDENT (N_Number) ON DELETE CASCADE,
  FOREIGN KEY (Set_ID) REFERENCES NOTECARD_SET (Set_ID) ON DELETE SET NULL
);

--corresponds to "Planner_Task"
CREATE TABLE PLANNER_TASK
(
  User_ID CHAR(9) NOT NULL,
  --Start_Time CHAR(24) NOT NULL,
  --End_Time CHAR(24) NOT NULL,
  All_day_Trigger CHAR(1) DEFAULT ('F'),
  Start_Date CHAR(24) NOT NULL, 
  End_Date CHAR(24) NOT NULL, --(Ex. “2023-03-02T21:14:38.228Z”)   this?
  Task_Subject VARCHAR(30),
  Description VARCHAR(100),
  Repeat_Value VARCHAR(80),

  PRIMARY KEY (User_ID, Start_Date, End_Date, Task_Subject),
  FOREIGN KEY (User_ID) REFERENCES Student (N_Number) ON DELETE SET NULL
);


INSERT INTO STUDENT (Name, N_Number, Image_Url)
VALUES('Alex Keo', 'n01493244', 'https://cdn.discordapp.com/attachments/1068603528051966022/1069677109582250084/20230130_125414.jpg');

INSERT INTO NOTECARD_SET(N_Number, Set_ID, Set_Name, Set_Description, Is_Public)
VALUES('n01493244', 'set_id_001', 'notecard_id_001', 'Software Engineering - Notecards for software engineering chapter 2 - 10', 'T');

INSERT INTO NOTECARD(Set_ID, Notecard_ID, Question, Answer)
VALUES('set_id_001', 'notecard_id_001', 'How long is 1 meter in cm?', '100cm');

INSERT INTO VIEW_SET(Favorite, User_ID, Set_ID)
VALUES('F', 'n01493244', 'set_id_001');

INSERT INTO PLANNER_TASK(User_ID, All_day_Trigger, Start_Date, End_Date, Task_Subject, Description, Repeat_Value)
VALUES('n01493244','F', '2023-03-02T21:14:38.228Z', '2023-03-02T21:14:38.228Z', 'Execute Plan to Commit Felony', 'Place cameras all around campus', 'FREQ=WEEKLY;BYDAY=MO,WE,TH,FR,SA;UNTIL=20230303T045959Z');
