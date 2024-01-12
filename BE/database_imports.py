from library.quiz.model.User import User
from library.quiz.model.Question import Question
from library.quiz.model.Quiz import Quiz
from library.quiz.model.StudentQuiz import StudentQuiz
from database import db

def import_data():
    user1 = User(id="3218bcde-d0b4-44b3-bf2c-01e068c6f82b", username="pera123", password="sifra123", name="Pera",surname="Peric", role='TEACHER', subject_id=123)
    user2 = User(id="5218bcde-d0b4-44b3-bf2c-01e068c6f82b",username="zoki123",password="sifra123",name="Zoran", surname="Kesic", role='STUDENT', subject_id=123)
    db.session.add(user1)
    db.session.add(user2)

    question1 = Question(id = "d7aeb9ab-5055-4f5b-b32c-0b7f5d6c23b9", question="Koja je osnovna funkcija mitohondrija?",correct_answer= "Glavna funkcija mitohondrija u ćeliji je proizvodnja energije putem procesa respiracije",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question2 = Question(id = "3ffde60b-7c8f-46d6-8c7a-1f670a336f0c",question= "Koja je funkcija bubrega?", correct_answer="Funkcija bubrega je filtracija krvi i regulacija ravnoteže elektrolita",points= 5,type= 'MULTIPLE_CHOICE', other_choice_answer = ["Funkcija bubrega je filtracija elektrolita i regulacija ravnoteže krvi","Bubrezi pomažu u transportu kiseonika u telo","Bubrezi luče insulin"])
    db.session.add_all([question1,question2])


    question11 = Question(id = "d1aeb1ab-5055-4f5b-b32c-0b7f5d6c23b5", question="Šta je ćelija?",correct_answer= "Ćelija je osnovna jedinica građe i funkcije svih živih bića",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question22 = Question(id = "1ffde60b-7c8f-46d6-8c7a-1f670a336f0c", question= "Koji organizam ne spada u višećelijske?", correct_answer="Bičari",points= 5,type='MULTIPLE_CHOICE', other_choice_answer = ["Biljke","Životinje","Gljive"])
    question33 = Question(id = "d2aeb9ab-5055-4f5b-b32c-0b7f5d6c23b5", question="Navedi jednoćelijske organizme",correct_answer= "Bakterije, amebe, bičari, trepljari",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question44 = Question(id = "d3aeb9ab-5055-4f5b-b32c-0b7f5d6c23b5", question="Koja je razlika između prokariota i eukariota?",correct_answer= "Eukarioti sadrže jedro, dok prokarioti ne",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question55 = Question(id = "2ffde60b-7c8f-46d6-8c7a-1f670a336f0c",question= "Bakterije spadaju u:", correct_answer="Prokariote",points= 5,type='MULTIPLE_CHOICE', other_choice_answer = ["Amebe","Eukariote","Životinje"])
    question77 = Question(id = "d5aeb9ab-5055-4f5b-b32c-0b7f5d6c23b5", question="Koja je osnovna funkcija mitohondrija?",correct_answer= "Glavna funkcija mitohondrija u ćeliji je proizvodnja energije putem procesa respiracije",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question88 = Question(id = "d6aeb9ab-5055-4f5b-b32c-0b7f5d6c23b5", question="Kako se zove deoba somatskih ćelija, a kako polnih?",correct_answer= "Deoba somatskih ćelija se zove mitoza, a polnih mejoza",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question66 = Question(id = "4ffde60b-7c8f-46d6-8c7a-1f670a336f0c",question= "Šta se nalazi u jedru?", correct_answer="DNK",points= 5,type= 'MULTIPLE_CHOICE', other_choice_answer = ["Mitohondrije","Ribozomi","Citoplazma"])
    question99 = Question(id = "d7aeb9ab-5055-4f5b-b32c-0b7f5d6c23b3", question="Navedi faze mitoze.",correct_answer= "Profaza, metafaza, anafaza, telofaza",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question10 = Question(id = "8ffde60b-7c8f-46d6-8c7a-1f670a336f0c",question= "Koliko hromozoma sadrži jedna somatska ćelija?", correct_answer="46",points= 5,type= 'MULTIPLE_CHOICE', other_choice_answer = ["23","1","44"])
    db.session.add_all([question11,question22,question33,question44,question55,question66,question77,question88,question99])


    question111 = Question(id = "45b158c0-cc1b-49cb-be86-52ff51730a63", question="Koja struktura kod ptica je odgovorna za disanje?",correct_answer= "Ždrelo je odgovorno za disanje.",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question222 = Question(id = "0d75abb9-cb53-460b-9644-8138dfd0510c",question= "Koja je funkcija kljuna kod ptica?", correct_answer="Hvatanje hrane",points= 5,type= 'MULTIPLE_CHOICE', other_choice_answer = ["Disanje","Slušanje zvukova","Održavanje ravnoteže"])
    question333 = Question(id = "7d1babd3-9796-490f-8ce8-e56b57d46531", question="Gde ptice obično polažu jaja",correct_answer= "Ptice uglavnom polažu jaja na tlu ili gnezdu.",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question444 = Question(id = "5c90188f-8b33-4886-9a2b-9658645c3a71", question="Šta je gnezdo?",correct_answer= "Mesto gne ptice polažu svoja jaja i podižu mladunce",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question555 = Question(id = "29e1aef2-3cd2-4f9a-b801-408bd0102470",question= "Koja vrsta ptica često koristi ples kao dio svog udvaranja", correct_answer="Plamenac",points= 5,type= 'MULTIPLE_CHOICE', other_choice_answer = ["Sove","Papige","Vrapci"])
    question666 = Question(id = "5ebc1264-da8e-40ff-bf3c-72da35028c6c",question= "Koje ptice migriraju na velike udaljenosti tijekom godišnjih doba?", correct_answer="Laste",points= 5,type= 'MULTIPLE_CHOICE', other_choice_answer = ["Soko","Jastreb","Gavran"])
    question777 = Question(id = "0d4f2c8f-ee43-43bb-ab06-abd665f08709", question="Šta je mitarenje?",correct_answer= "Proces odbacivanje starog i odbacivanje novog perja kod ptica se naziva mitarenje",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    question888= Question(id = "8c1aa1ad-c703-4648-b1ec-cd26ef072402", question="Koja ptica koristi svoj kljun za izradu gnijezda od blata?",correct_answer= "Lasta",points= 10, type='FREE_ANSWER', other_choice_answer=[])
    db.session.add_all([question111,question222,question333,question444,question555,question666,question777,question888])

    quiz1 = Quiz(
        id="d7aeb9ab-5055-4f5b-b32c-0b7f5d6c23b0",
        questions=[question1,question2],
        title="Inicijalni test",
        notes="Test se radi 45 minuta.",
        subject="Biologija",
        teacher_id="3218bcde-d0b4-44b3-bf2c-01e068c6f82b",
        teacher=user1,
        creation_date="2023-11-10",
        schedule_date="2024-01-12",
        schedule_time="2024-01-12 15:00:00",
        schedule_end_time="2024-01-12 15:45:00",
        student_groups=["Group A", "Group B"]
    )

    quiz2 = Quiz(
        id="m7aeb9ab-5055-4f5b-b32c-0b7f5d6c23b0",
        questions=[question11,question22,question33,question44,question55,question66,question77,question88,question99,question10],
        title="Ćelija",
        notes="Test se radi 45 minuta.",
        subject="Biologija",
        teacher_id="3218bcde-d0b4-44b3-bf2c-01e068c6f82b",
        teacher=user1,
        creation_date="2023-11-22",
        schedule_date="2024-01-11",
        schedule_time="2024-01-11 09:00:00",
        schedule_end_time="2024-01-11 09:45:00",
        student_groups=["Group A", "Group B"]
    )

    quiz3 = Quiz(
        id="6d291f39-ccfd-4e91-ad65-f1bacae1a7df",
        questions=[question111,question222,question333,question666,question777,question888],
        title="Ptice",
        notes="Test se radi 45 minuta.",
        subject="Biologija",
        teacher_id="3218bcde-d0b4-44b3-bf2c-01e068c6f82b",
        teacher=user1,
        creation_date="2024-01-09",
        schedule_date="2024-01-09",
        schedule_time="2024-01-09 10:00:00",
        schedule_end_time="2024-01-09 10:45:00",
       student_groups=["Group A", "Group B"]
    )
    db.session.add_all([quiz1,quiz2,quiz3])


    db.session.commit()
    print('uneto')