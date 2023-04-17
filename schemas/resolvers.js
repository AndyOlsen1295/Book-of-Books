const books = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedDate: '1925' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedDate: '1960' },
  { title: '1984', author: 'George Orwell', publishedDate: '1949' },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

module.exports = resolvers;
