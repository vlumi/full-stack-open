const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list-helper");

describe("dummy", () => {
  test("dummy returns one", () => expect(dummy([])).toBe(1));
});

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];
const testBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("total likes", () => {
  test("totalLikes in undefined", () => expect(totalLikes(undefined)).toBe(0));
  test("totalLikes in []", () => expect(totalLikes([])).toBe(0));
  test("when list has only one blog equals the likes of that", () =>
    expect(totalLikes(listWithOneBlog)).toBe(5));
  test("totalLikes in testBlogs", () => expect(totalLikes(testBlogs)).toBe(36));
});

describe("favorite blog", () => {
  test("favoriteBlog in undefined", () =>
    expect(favoriteBlog(undefined)).toEqual(undefined));
  test("favoriteBlog in []", () =>
    expect(favoriteBlog(undefined)).toEqual(undefined));
  test("favoriteBlog single blog", () =>
    expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]));
  test("testBlogs single blog", () =>
    expect(favoriteBlog(testBlogs)).toEqual(testBlogs[2]));
});

describe("most blogs", () => {
  test("mostBlogs in undefined", () =>
    expect(mostBlogs(undefined)).toEqual(undefined));
  test("mostBlogs in []", () =>
    expect(mostBlogs(undefined)).toEqual(undefined));
  test("mostBlogs single blog", () =>
    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    }));
  test("mostBlogs testBlogs", () =>
    expect(mostBlogs(testBlogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    }));
});
describe("most likes", () => {
  test("mostLikes in undefined", () =>
    expect(mostLikes(undefined)).toEqual(undefined));
  test("mostLikes in []", () =>
    expect(mostLikes(undefined)).toEqual(undefined));
  test("mostLikes single blog", () =>
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    }));
  test("mostLikes testBlogs", () =>
    expect(mostLikes(testBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    }));
});

