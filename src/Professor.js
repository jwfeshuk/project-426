import { app } from './base';

class Professor {
    constructor(professor) {
        this.first = professor.first //string
        this.last = professor.last //string
        this.profID = professor.profID //string
        
        this.findReviews();
    }

    findReviews() {
        let reviewArray = []

        let reviewsRef = app.firestore().collection("/reviews").get()
        reviewsRef.forEach((review) => {
            if (review.profID === this.profID) {
                reviewArray.push(review)
            }
        })

        this.reviews = reviewArray //array of Review objects
        return this.reviews
    }

    update(review) {
        this.reviews.push(review)

        app.firestore().collection("/professors").doc(this.profID).update({
            reviews: this.reviews
        })
    }
}

Professor.create = (professor) => {
    let profDB = app.firestore().collection("/professors").doc()

    professor.profID = profDB.getId()
    profDB.add(professor)

    return new Professor(professor)
}

Professor.read = (profID) => {
    let professor = app.firestore().collection("/professors").doc(profID)

    professor.get().then((dbProf) => {
        if (dbProf.exists) {
            return dbProf.data();
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

Professor.delete = (profID) => {
    app.firestore().collection("/professors").doc(profID).delete().then(() => {
        console.log("Document successfully deleted!")
    }).catch((error) => {
        console.error("Error removing document: ", error)
    })
}

export default Professor;