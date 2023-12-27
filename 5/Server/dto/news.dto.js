export const newsDto = ({ _id, created_at, text, title, user }) => {
  return {
    id: _id ? _id : null,
    created_at,
    text,
    title,
    user,
  };
};
