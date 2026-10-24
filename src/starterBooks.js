const starterBooks = [
  [1342, 'Pride and Prejudice', 'Jane Austen', 'romance drama'],
  [158, 'Emma', 'Jane Austen', 'romance drama'],
  [161, 'Sense and Sensibility', 'Jane Austen', 'romance drama'],
  [105, 'Persuasion', 'Jane Austen', 'romance drama'],
  [121, 'Northanger Abbey', 'Jane Austen', 'romance gothic'],
  [141, 'Mansfield Park', 'Jane Austen', 'romance drama'],
  [1260, 'Jane Eyre', 'Charlotte Brontë', 'romance gothic drama'],
  [768, 'Wuthering Heights', 'Emily Brontë', 'romance gothic drama'],
  [1513, 'Romeo and Juliet', 'William Shakespeare', 'romance drama'],
  [145, 'Middlemarch', 'George Eliot', 'romance drama'],
  [345, 'Dracula', 'Bram Stoker', 'gothic mystery'],
  [84, 'Frankenstein', 'Mary Shelley', 'gothic drama'],
  [174, 'The Picture of Dorian Gray', 'Oscar Wilde', 'gothic drama'],
  [43, 'The Strange Case of Dr. Jekyll and Mr. Hyde', 'Robert Louis Stevenson', 'gothic mystery'],
  [1661, 'The Adventures of Sherlock Holmes', 'Arthur Conan Doyle', 'mystery'],
  [2852, 'The Hound of the Baskervilles', 'Arthur Conan Doyle', 'mystery gothic'],
  [583, 'The Woman in White', 'Wilkie Collins', 'mystery drama'],
  [155, 'The Moonstone', 'Wilkie Collins', 'mystery drama'],
  [98, 'A Tale of Two Cities', 'Charles Dickens', 'drama romance'],
  [1400, 'Great Expectations', 'Charles Dickens', 'drama romance'],
].map(([id, title, author, topics]) => ({ id, title, authors: [{ name: author }], topics }))

export default starterBooks
