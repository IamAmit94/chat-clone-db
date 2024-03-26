import { User } from "./../src/models/user.module.js";
import { faker } from "@faker-js/faker";

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUsers; i++) {
      //    usersPromise.push()

      const tempUser = User.create({
        name: faker.person.fullName(), 
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }

    await Promise.all(usersPromise);
    console.log("users created ", numUsers);
    process.exit(1);
  } catch (error) {
    console.log('Error while creating the dummy user: ',error);
    process.exit();
  }
};
export { createUser };
