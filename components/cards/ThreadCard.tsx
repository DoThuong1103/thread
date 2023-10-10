"use client";

import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import { toggleLikeThread } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";
import Share from "./Share";
import { useState } from "react";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: string;
  community: string | null;
  createdAt: string;
  comments: string;
  isComment?: boolean;
  likes: string;
}

function ThreadCards({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likes,
}: Props) {
  const dataAuthor = JSON.parse(author);
  const dataCommunity = community ? JSON.parse(community) : null;
  const dataComments = JSON.parse(comments);
  const dataLikes = JSON.parse(likes);
  console.log(dataLikes);
  const pathname = usePathname();
  const handlerLike = async () => {
    console.log(id, JSON.parse(currentUserId));
    await toggleLikeThread(id, JSON.parse(currentUserId), pathname);
  };
  const [isShare, setIsShare] = useState(false);
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      {isShare && (
        <>
          <div
            className="fixed w-screen h-screen bg-gray-100 top-0 left-0 opacity-20"
            onClick={() => setIsShare(false)}
          ></div>
          <Share userId={id} />
        </>
      )}
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${dataAuthor?.id}`}
              className="relative h-11 w-11"
            >
              <Image
                src={dataAuthor?.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${dataAuthor?.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {dataAuthor?.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <div onClick={handlerLike}>
                  {dataLikes?.some(
                    (like: any) => like.user == JSON.parse(currentUserId)
                  ) ? (
                    <>
                      <Image
                        src="/assets/heart-filled.svg"
                        alt="heart"
                        width={24}
                        height={24}
                        className="cursor-pointer object-contain z-10 "
                      />
                    </>
                  ) : (
                    <Image
                      src="/assets/heart-gray.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain "
                    />
                  )}
                </div>
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <div onClick={() => setIsShare(true)}>
                  <Image
                    src="/assets/share.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </div>
              </div>

              {isComment && dataComments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {dataComments.length} repl
                    {dataComments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={dataAuthor?.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && dataComments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {dataComments.slice(0, 2).map((comment: any, index: number) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {dataComments.length} repl{dataComments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && dataCommunity && (
        <Link
          href={`/communities/${dataCommunity?.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {dataCommunity && ` - ${dataCommunity?.name} Community`}
          </p>

          <Image
            src={dataCommunity?.image}
            alt={dataCommunity?.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCards;
