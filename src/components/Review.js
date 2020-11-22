import { app } from '../base';

class Review {
    constructor(review) {
        this.first = review.first //string
        this.last = review.last //string
        this.courseCode = review.courseCode //string
        this.rating = review.rating //num
        this.difficulty = review.difficulty //num
        this.takeAgain = review.takeAgain //boolean
        this.forCredit = review.forCredit //boolean
        this.useTexbook = review.useTextbook //boolean
        
        if (typeof review.attendance != "undefined") {
            this.attendance = review.attendance //boolean
        }

        if (typeof review.grade != "undefined") {
            this.grade = review.grade //string
        }

        if (typeof review.tags != "undefined") {
            this.tags = review.tags //[string, ...] of length >=0 && <=3
        }

        this.specifics = review.specifics //string
    }

    update() {

    }
}

Review.create = async (review) => {
    await app.firestore().collection("/reviews").add(review)

    return new Review(review)
}

Review.read = (reviewID) => {
    let review = app.firestore().collection("/reviews").doc(reviewID)

    review.get().then((dbReview) => {
        if (dbReview.exists) {
            return dbReview.data();
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

Review.delete = (reviewID) => {
    app.firestore().collection("/reviews").doc(reviewID).delete().then(() => {
        console.log("Document successfully deleted!")
    }).catch((error) => {
        console.error("Error removing document: ", error)
    })
}