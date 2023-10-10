import Share from "@/components/cards/Share";
import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";
import { fetchPosts } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    5
  );

  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length == 0 ? (
          <p className="no-result"> No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post?._id}
                id={post?._id}
                currentUserId={JSON.stringify(userInfo?._id)}
                parentId={post?.parentId}
                content={post?.text}
                author={JSON.stringify(post?.author)}
                createdAt={post?.createdAt}
                community={JSON.stringify(post.community)}
                likes={JSON.stringify(post.likes)}
                comments={JSON.stringify(post.children)}
              />
            ))}
          </>
        )}
      </section>
      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}
