import { FieldValue, firebase } from "../lib/firebase";

export async function doesEmailExists(emailAddress: string) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("emailAddress", "==", emailAddress)
    .get();

  return result.docs.length > 0;
}

export async function getUserByUserId(userId: string) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function getUserPhotosByUserId(userId: string) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return photos;
}

export async function getSuggestedProfiles(userId: string, following: any) {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile: any) =>
        profile.userId !== userId && !following.includes(profile?.userId)
    );
}

export async function updateCurrentUserFollowing(
  loggedInUserDocId: string,
  profileId: string,
  isFollowingprofile: boolean
) {
  await firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingprofile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  userDocId: string,
  userId: string,
  isFollowingprofile: boolean
) {
  await firebase
    .firestore()
    .collection("users")
    .doc(userDocId)
    .update({
      followers: isFollowingprofile
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

export async function getPhotos(userId: string, following: string) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userPhotos = await getUserPhotosByUserId(userId);

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  userFollowedPhotos.push(...userPhotos);

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo: any) => {
      let userLikedPhotos = false;

      if (photo.likes?.includes(userId)) {
        userLikedPhotos = true;
      }

      const user: any = await getUserByUserId(photo.userId);

      const { fullName, avatar } = user[0];

      return { fullName, avatar, ...photo, userLikedPhotos };
    })
  );

  return photosWithUserDetails;
}

export async function toogleFollow(
  isFollowingprofile: boolean,
  activeUserDocId: string,
  profileDocId: string,
  profileUSerId: string,
  followingUserId: string
) {
  await updateCurrentUserFollowing(
    activeUserDocId,
    profileUSerId,
    isFollowingprofile
  );

  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingprofile
  );
}

export async function uploadFile(file: any) {
  const formData = new FormData();
  const uploadPreset = process.env.REACT_APP_uploadPreset;
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset!);

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/atm1x/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await res.json();

    const { url } = result;
    return url;
  } catch (error) {
    console.log(error);
  }
}
