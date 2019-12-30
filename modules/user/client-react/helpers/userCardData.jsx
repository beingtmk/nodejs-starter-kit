const userCardData = (t, user, Id) => {
  // const { t, user, Id } = props;
  const endorsements = user.endorsements;

  const endorsed = user.endorsed;
  const followers = user.followers;
  const following = user.following;

  const isCurrentUser = () => user && Id === user.id;

  function getEndorsements(endorsement) {
    if (endorsement) {
      var data = endorsement.endorser.profile;

      return data;
    } else {
      return null;
    }
  }
  function getEndorsed(endorse) {
    if (endorse) {
      var data = endorse.endorsee.profile;

      return data;
    } else {
      return null;
    }
  }

  function getFollowers(follower) {
    if (follower) {
      var data = follower.follower.profile;
      return data;
    } else {
      return null;
    }
  }

  function getFollowing(follow) {
    if (follow) {
      return follow.followee.profile;
    } else {
      return null;
    }
  }

  return {
    endorsements: {
      title: t('profile.card.group.endorsements.title'),
      notFound: t('profile.card.group.endorsements.notFound'),
      list: !isCurrentUser() || endorsements.length === 0 ? [] : endorsements.map(getEndorsements)
    },
    endorsed: {
      title: t('profile.card.group.endorsed.title'),
      notFound: t('profile.card.group.endorsed.notFound'),
      list: !isCurrentUser() || endorsed.length === 0 ? [] : endorsed.map(getEndorsed)
    },
    followers: {
      title: t('profile.card.group.followers.title'),
      notFound: t('profile.card.group.followers.notFound'),
      list: !isCurrentUser() || followers.length === 0 ? [] : followers.map(getFollowers)
    },
    following: {
      title: t('profile.card.group.following.title'),
      notFound: t('profile.card.group.following.notFound'),
      list: !isCurrentUser() || following.length === 0 ? [] : following.map(getFollowing)
    },
    profileHead: {
      rating: t('profile.card.group.rating'),
      acceptanceRate: t('profile.card.group.acceptanceRate'),
      responseTime: t('profile.card.group.responseTime')
    },
    verification: {
      mobileVerification: {
        isVerified: user && user.verificatio && user.verification.isMobileVerified,
        mobile: user && user.profile && user.profile.mobile
      },
      emailVerification: {
        isVerified: user && user.verification && user.verification.isEmailVerified,
        email: user.email
      },
      dlVerification: {
        isVerified: user && user.verification && user.verification.isIdVerified,
        identification: user.identification
      },
      photoIdVerification: {
        isVerified: user && user.verification && user.verification.isPhotoIdVerified,
        photoId: user.photoId
      }
    }
  };
};

export default userCardData;
