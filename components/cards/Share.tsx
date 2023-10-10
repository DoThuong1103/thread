"use client";

import React from "react";

type Props = {
  userId: any;
};
const Share = ({ userId }: Props) => {
  return (
    <section className="fixed top-[50%] translate-y-[-50%]  left-[50%] translate-x-[-75%] h-60 w-96 bg-white z-10">
      https://thread-ruby.vercel.app/thread/{userId}
    </section>
  );
};

export default Share;
