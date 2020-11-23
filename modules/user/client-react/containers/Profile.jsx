import React from "react";
import ProfileView from "../components/ProfileView";

const Profile = (props) => {
  const user = {
    username: "username",
    role: "user",
    profile: {
      firstName: "Yashwanth",
      lastName: "Sambaraj",
      cover:
        "https://res.cloudinary.com/dpvrqxttb/image/upload/v1604566920/edgenus/image/nkzfil4lqjf556ipjwi5.png",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQV9IZZN1faELpjixZnAeYWoESqnPoIpFiPcw&usqp=CAU",
    },
  };
  return <ProfileView {...props} user={user} />;
};

export default Profile;
