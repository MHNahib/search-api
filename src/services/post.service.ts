import { PostModel } from "../models";

const upsertPosts = async (posts: any[]): Promise<any> => {
  const bulkOptions = posts.map((post) => ({
    updateOne: {
      filter: { postId: post.id },
      update: {
        userId: post.userId,
        postId: post.id,
        title: post.title,
        body: post.body,
      },
      upsert: true,
    },
  }));

  try {
    const result = await PostModel.bulkWrite(bulkOptions);
    const updatedPosts = await PostModel.find({
      postId: { $in: posts.map((p) => p.id) },
    });
    console.log(
      `Upserted ${result.upsertedCount} posts, updated ${result.modifiedCount} posts`
    );
    return updatedPosts;
  } catch (error) {
    console.error("Error upserting posts:", error);
    throw error;
  }
};

export { upsertPosts };
