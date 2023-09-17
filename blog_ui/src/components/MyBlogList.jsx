import ItemMyBlog from "../components/MyBlogs.jsx";
import { useSelector } from "react-redux/es/hooks/useSelector.js";
import { VStack } from "@chakra-ui/react";
function MyBlogsList(card) {
  const list = useSelector((state) => state.blog.bloglist); //getState
  const userDetails = useSelector(
    (state) => state.auth.userDetails.userDetails
  );
  console.log(userDetails);
  console.log(list);
  const temp = list.filter((value) => {
    console.log(value.authorId, " ", userDetails.Email);
    return value.authorId === userDetails.Email;
  });
  console.log("All authored Blogs ", temp);
  return (
    <VStack className="itemList">
      {temp.map((card) => {
        return (
          <ItemMyBlog
            Head={card.Head}
            Body={card.Body}
            authorId={card.authorId}
            Vote={card.Vote}
            _id={card._id}
          />
        );
      })}
    </VStack>
  );
}

export default MyBlogsList;
