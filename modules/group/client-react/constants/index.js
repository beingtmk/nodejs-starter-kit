export const MemberStatus = {
  WAITING: 'WAITING',
  ADDED: 'ADDED',
  REJECTED: 'REJECTED'
};

export const MemberType = {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
};

export const Name = profile => {
  if (profile && (profile.firstName || profile.lastName)) {
    if (profile.firstName && profile.lastName) return `${profile.firstName} ${profile.lastName}`;
    else if (profile.firstName) return profile.firstName;
    else return profile.lastName;
  } else return 'Name not provided ';
};

export const removeTypename = value => {
  if (value === null || value === undefined) {
    return value;
  } else if (Array.isArray(value)) {
    return value.map(v => removeTypename(v));
  } else if (typeof value === 'object') {
    const newObj = {};
    Object.entries(value).forEach(([key, v]) => {
      if (key !== '__typename') {
        newObj[key] = removeTypename(v);
      }
    });
    return newObj;
  }
  return value;
};

export const emptyCover =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBANDQ4NEA8PDw4PDg4NDw8NEA4QFRIWFhUSExMYHSggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIANIA8AMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABQQDAgEH/8QALxABAAIABAQFAwMFAQAAAAAAAAECAxEhMQQFElFBYXGBoSIywVJy0RVCkbHxgv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmcozn5AJnLWdPVix+YRGlNfOdmDExrW3mfwCpi8ZSvjn5RDhbmPas+8wngNv8AUbfpr8n9Rt+mvyxAN9eY96f4l3w+OpO8zHqkgL1bROsa+mr6hUxJic4mY9G3B5h4Xj/1H5gFAfK2idYnOO8PoAAAAAAAAAAAAAAAPOJiRWM52B8xcSKxnb/qVxXE2vptXt/LzxGNN5zn2js5AAAAAD3XBtO1bT7FsG8b1tHtIPAAAAOmBjWpOdfeJ2lW4fHi8Zxv4x4or1h3msxau8Aujlw+NF4zjfxjtLqAAAAAAAAAAAAAkcbxHXOUfbWdPPzbeYY3TXKN7fEJQAAAERM6RvOwPeDhTaemu/xEd5VOH4StfOe8/h64XAilcvH+6e8uwAAOOPwtb7xlPeN0rHwJpOU+0xtK254+FF6zWfb1BEHq9cpmJ3iXkAAHXh8aaW6o28Y7rNbZxnG06wgqHLMbek+Gtf4BvAAAAAAAAAAIHjGv01m3aJBK43F6rz2jSHAkAAAauXYed8/0xn7sqhyqNLesA3gAAAAAmc0w8pi3ff1hjU+Zx9EfuTAAAHvBxOm0W7Tq8AL8d42HDgr50jy0dwAAAAAAAAGbmNssOfPKGlk5n9kfuj/UglgAAAN/KrfdHpLA08vvlf1iYBWAAAAABi5pb6ax3smtnM752ivhWPljAAAABR5XOlo825P5VOt/SPyoAAAAAAAAAMnM/sj90flrZ+Ornh28tf8AAJAAAABE5axvGsAC5hYnVWLd/wDb2mcv4jpnonadvKVMAAB8vaIiZnaIzl9TuYcRn9FZ9Z/AMeJebTNp3mc3kAAAAAb+VR9/soMfK6/TM97fhsAAAAAAAAAfLVziYnxjJ9AQLRlMx2GvmOFlbq8La+7IABEZ6RGcztHcBpwOCtbWfpjvO/s1cJwcV+q+s+EeENgOGFwlK6xGc951dwAAAcsXhqW+6Ne8aS6gJmPwFo1r9UfMMa+z8VwsX1jS3fwkEger0ms5WjKXkAHbhMLqvEeEaz6AqcNh9NKx5a+rqAAAAAAAAAAAOPFYPXWY8d49Uaey+n8w4b++sfuj8gwKfL+G6Y67R9U7R2hk4LB6rRntGsq4AAAAAAAAAAM/F8PF40+6NvNI8p3X0zmWDlbrja2/qDGq8vwOmuc72+IZOB4fqnO32x8qoAAAAAAAAAAAAAAOWDgRTPLxnP0dQAAAAAAAAAAAc8fCi8dM7ZxLoA+VrERlGkQ+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q==';
