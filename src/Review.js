import { app } from './base';

class Review {
    constructor(review) {
        this.profID = review.profID //string
        this.reviewID = review.reviewID //string
        this.courseCode = review.courseCode //string
        this.rating = review.rating //num
        this.difficulty = review.difficulty //num
        this.takeAgain = review.takeAgain //boolean
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
        this.lastUpdated = review.lastUpdated
        this.lastUpdatedPretty = review.lastUpdatedPretty
    }

    update(review) {
        const { courseCode, rating, difficulty, takeAgain, useTextbook, specifics, lastUpdated, lastUpdatedPretty } = review
        let reviewRef = app.firestore().collection("/reviews").doc(this.reviewID)

        reviewRef.update({
            courseCode: courseCode,
            rating: rating,
            difficulty: difficulty,
            takeAgain: takeAgain,
            useTextbook: useTextbook,
            specifics: specifics,
            lastUpdated: lastUpdated,
            lastUpdatedPretty: lastUpdatedPretty
        }).then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        })

        this.courseCode = courseCode
        this.rating = rating
        this.difficulty = difficulty
        this.takeAgain = takeAgain
        this.useTextbook = useTextbook
        this.specifics = specifics
        this.lastUpdated = lastUpdated
        this.lastUpdatedPretty = lastUpdatedPretty

        if (typeof review.attendance != "undefined") {
            reviewRef.update({ attendance: review.attendance }).then(() => {
                console.log("Document successfully updated!");
                this.attendance = review.attendance
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            })
        }

        if (typeof review.grade != "undefined") {
            reviewRef.update({ grade: review.grade }).then(() => {
                console.log("Document successfully updated!");
                this.grade = review.grade
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            })
        }

        if (typeof review.tags != "undefined") {
            reviewRef.update({ tags: review.tags }).then(() => {
                console.log("Document successfully updated!");
                this.tags = review.tags
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            })
        }
    }
}

Review.create = (review) => {
    let reviewDB = app.firestore().collection("/reviews").doc()
    
    review.reviewID = reviewDB.getId()
    let today = new Date()
    review.lastUpdated = today.getTime()
    review.lastUpdatedPretty = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
    
    reviewDB.set(review)

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

export default Review;