export const searchPosts = (posts: any[], keyword: string) =>
  posts?.filter((post) =>
    `${post?.title} ${post.body}`
      ?.toLowerCase()
      ?.includes(keyword.toLowerCase())
  );
