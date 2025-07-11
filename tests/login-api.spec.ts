import { test, expect, request } from '../fixtures/loginFixture-api'


test('logAPI-01 API login from JSON file',{tag: "@logapi"}, async ({ loginUser }) => {

  const context = await request.newContext();

  const response = await context.post('https://teststore.automationtesting.co.uk/index.php?controller=authentication?back=https%3A%2F%2Fteststore.automationtesting.co.uk%2Findex.php%3F', {
    data: {
      email: loginUser.email,
      password: loginUser.password,
    },
  });

  expect(response.ok()).toBeTruthy();
  console.log(`Login successful for: ${loginUser.email}`);
  console.log(`login user for: ${loginUser.firstname}, ${loginUser.lastname}`);
    
});