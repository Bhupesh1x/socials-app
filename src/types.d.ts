export interface User {
  dateCreated: number;
  docId: string;
  emailAddress: string;
  followers: string[];
  following: string[];
  fullName: string;
  userId: string;
  username: string;
  avatar?: string;
}

export interface Photos {
  caption: string;
  comments: [];
  dateCreated: number;
  docId: string;
  imageSrc: string;
  likes: string[];
  photoId: number;
  userId: string;
  userLatitude?: string;
  userLongitude?: string;
  fullName: string;
  username?: string;
}

export interface FirebaseObject {
  firebase: Firebase.app.App;
  FieldValue: typeof Firebase.firestore.FieldValue;
}
