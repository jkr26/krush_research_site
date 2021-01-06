var faker = require("faker");

var database = { posts: [] };

for (var i = 1; i <= 100; i++) {
  database.posts.push({
    id: i,
    title: faker.lorem.sentence(),
    short_description: faker.lorem.sentences(),
    post: faker.lorem.sentences(),
  });
}

console.log(JSON.stringify(database));
