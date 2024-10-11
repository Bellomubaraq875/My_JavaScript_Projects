let user = {
  name: 'Mubarak',
  age: 30,
  email: 'bellomubarak875@gmail.com',
  location: 'Oshogbo',
  blogs: ['why mac and cheese rules', '10 things to make with marmite'],
  login: function(){
    console.log('the user logged in');
  },
  logout: function(){
    console.log('the user logged out');
  },
  logBlogs: function(){
    console.log('this user has written the following blogs:');
    this.blogs.forEach(blog => {
      console.log(blog);
    })
  }
};
// user.logBlogs();
// console.log(this); 