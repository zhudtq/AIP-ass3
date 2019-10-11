export class PostModel {
  mainImage: String;
  ownerName: String;
  ownerId: any;
  likes: [{
    liker: String;
  }];
  comments: [{
    commenter: String;
    content: String;
  }];
}
