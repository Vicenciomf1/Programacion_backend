import { schema, normalize, denormalize  } from "normalizr";
import util from 'util';

const print = (object) => {
  console.log(util.inspect(object, false, 12, true));
}

const blogpost = {
  id: "1",
  title: "My blog post",
  description: "Short blogpost description",
  content: "Hello world",
  author: {
    id: "1",
    name: "John Doe"
  },
  comments: [
    {
      id: "1",
      author: "Rob",
      content: "Nice post!"
    },
    {
      id: "2",
      author: "Jane",
      content: "I totally agree with you!"
    }
  ]
};

//Definicion de schemas
const authorSchema = new schema.Entity('authors');

const commentSchema = new schema.Entity('comments');

const postSchema = new schema.Entity('posts',{
  author: authorSchema,
  comments: [commentSchema]
});
 
const objetoNormalizado = normalize(blogpost, postSchema);

print(objetoNormalizado);

const objetoDesnormalizado = denormalize(objetoNormalizado.result, postSchema, objetoNormalizado.entities);

print(objetoDesnormalizado);